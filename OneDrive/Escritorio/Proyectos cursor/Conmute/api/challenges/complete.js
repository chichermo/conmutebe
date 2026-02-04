const { withCors } = require('../_utils/response');
const { getSupabaseClient } = require('../_utils/supabase');
const { requireAuth } = require('../_utils/auth');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  let userId;
  try {
    userId = requireAuth(req);
  } catch (error) {
    return res.status(error.status || 401).json({ message: error.message });
  }

  const { challengeId } = req.body || {};
  const supabase = getSupabaseClient();
  const { data: challenge } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (!challenge) {
    return res.status(404).json({ message: 'Desafío no encontrado' });
  }

  const { data: user } = await supabase.from('users').select('points').eq('id', userId).single();
  const newPoints = (user?.points || 0) + (challenge.points || 0);
  await supabase.from('users').update({ points: newPoints }).eq('id', userId);

  return res.json({ success: true });
});
