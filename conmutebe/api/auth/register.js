const { withCors } = require('../_utils/response');
const { getSupabaseAdminClient, getSupabaseAnonClient } = require('../_utils/supabase');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const admin = getSupabaseAdminClient();
  const { data: existing } = await admin
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ message: 'Email ya registrado' });
  }

  const anon = getSupabaseAnonClient();
  const { data: authData, error: authError } = await anon.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return res.status(500).json({ message: 'Error registrando usuario' });
  }

  const { data: profile, error: profileError } = await admin
    .from('users')
    .insert({
      id: authData.user.id,
      name,
      email,
      language: 'nl',
      region: 'flanders',
      points: 0,
      is_premium: false,
    })
    .select('*')
    .single();

  if (profileError) {
    return res.status(500).json({ message: 'Error creando perfil' });
  }

  return res.json({
    token: authData.session?.access_token || '',
    user: {
      id: profile.id,
      name: profile.name,
      language: profile.language,
      region: profile.region,
      points: profile.points,
      isPremium: profile.is_premium,
    },
  });
});
