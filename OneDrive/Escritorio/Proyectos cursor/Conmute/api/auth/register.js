const { withCors } = require('../_utils/response');
const { getSupabaseClient } = require('../_utils/supabase');
const { signToken } = require('../_utils/auth');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const supabase = getSupabaseClient();
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ message: 'Email ya registrado' });
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password_hash: password,
      language: 'nl',
      region: 'flanders',
      points: 0,
      is_premium: false,
    })
    .select('*')
    .single();

  if (error) {
    return res.status(500).json({ message: 'Error creando usuario' });
  }

  const token = signToken(data.id);
  return res.json({
    token,
    user: {
      id: data.id,
      name: data.name,
      language: data.language,
      region: data.region,
      points: data.points,
      isPremium: data.is_premium,
    },
  });
});
