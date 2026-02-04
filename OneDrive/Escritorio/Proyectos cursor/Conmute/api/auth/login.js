const { withCors } = require('../_utils/response');
const { getSupabaseClient } = require('../_utils/supabase');
const { signToken } = require('../_utils/auth');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const supabase = getSupabaseClient();
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password_hash', password)
    .maybeSingle();

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const token = signToken(user.id);
  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      language: user.language,
      region: user.region,
      points: user.points,
      isPremium: user.is_premium,
    },
  });
});
