const { withCors } = require('../_utils/response');
const { getSupabaseAdminClient, getSupabaseAnonClient } = require('../_utils/supabase');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const anon = getSupabaseAnonClient();
  const { data: authData, error: authError } = await anon.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const admin = getSupabaseAdminClient();
  const { data: user } = await admin.from('users').select('*').eq('id', authData.user.id).single();
  if (!user) {
    return res.status(404).json({ message: 'Perfil no encontrado' });
  }

  const token = authData.session?.access_token || '';
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
