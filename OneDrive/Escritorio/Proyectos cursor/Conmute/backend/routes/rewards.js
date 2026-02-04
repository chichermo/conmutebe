const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const rewards = [
  { id: 'reward-1', name: 'Cerveza Flandes', pointsCost: 120, partner: 'Flandes Bar' },
  { id: 'reward-2', name: 'Café de Bruselas', pointsCost: 80, partner: 'Brussels Café' },
];

router.get('/', (_req, res) => {
  res.json(rewards);
});

router.post('/redeem', authenticate, async (req, res) => {
  const { rewardId } = req.body;
  const reward = rewards.find((item) => item.id === rewardId);
  if (!reward) {
    return res.status(404).json({ message: 'Recompensa no encontrada' });
  }
  const user = await User.findById(req.userId);
  if (!user || user.points < reward.pointsCost) {
    return res.status(400).json({ message: 'Puntos insuficientes' });
  }
  user.points -= reward.pointsCost;
  await user.save();
  return res.json({ success: true, reward });
});

module.exports = router;
