const { withCors } = require('../_utils/response');
const { getSupabaseAdminClient } = require('../_utils/supabase');
const { requireAuth } = require('../_utils/auth');

const rewards = [
  { id: 'reward-1', name: 'Cerveza Flandes', pointsCost: 120, partner: 'Flandes Bar' },
  { id: 'reward-2', name: 'Café de Bruselas', pointsCost: 80, partner: 'Brussels Café' },
];

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

  const { rewardId } = req.body || {};
  const reward = rewards.find((item) => item.id === rewardId);
  if (!reward) {
    return res.status(404).json({ message: 'Recompensa no encontrada' });
  }

  const admin = getSupabaseAdminClient();
  const { data: user } = await admin.from('users').select('points').eq('id', userId).single();
  if (!user || user.points < reward.pointsCost) {
    return res.status(400).json({ message: 'Puntos insuficientes' });
  }

  const newPoints = user.points - reward.pointsCost;
  await admin.from('users').update({ points: newPoints }).eq('id', userId);

  return res.json({ success: true, reward });
});
