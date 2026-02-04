const { withCors } = require('../_utils/response');
const { getSupabaseAdminClient } = require('../_utils/supabase');
const { requireAuth } = require('../_utils/auth');

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  let userId;
  try {
    userId = await requireAuth(req);
  } catch (error) {
    return res.status(error.status || 401).json({ message: error.message });
  }

  const { challengeId } = req.body || {};
  const admin = getSupabaseAdminClient();
  const { data: challenge } = await admin
    .from('challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (!challenge) {
    return res.status(404).json({ message: 'Desafío no encontrado' });
  }

  const { data: user } = await admin.from('users').select('points').eq('id', userId).single();
  const newPoints = (user?.points || 0) + (challenge.points || 0);
  await admin.from('users').update({ points: newPoints }).eq('id', userId);

  return res.json({ success: true });
});
