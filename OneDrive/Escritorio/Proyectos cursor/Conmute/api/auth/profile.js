const { withCors } = require('../_utils/response');
const { getSupabaseClient } = require('../_utils/supabase');
const { requireAuth } = require('../_utils/auth');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  let userId;
  try {
    userId = requireAuth(req);
  } catch (error) {
    return res.status(error.status || 401).json({ message: error.message });
  }

  const supabase = getSupabaseClient();
  const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.json({
    id: user.id,
    name: user.name,
    language: user.language,
    region: user.region,
    points: user.points,
    isPremium: user.is_premium,
  });
});
