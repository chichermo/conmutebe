const express = require('express');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const seedChallenges = async () => {
  const count = await Challenge.countDocuments();
  if (count > 0) {
    return;
  }
  await Challenge.insertMany([
    {
      title: 'Semana sin coche',
      description: 'Completa 3 rutas en bici o tren',
      points: 120,
      target: 3,
    },
    {
      title: 'Eco-lluvia',
      description: 'Viaja en transporte público con mal clima',
      points: 80,
      target: 2,
    },
  ]);
};

router.get('/', async (_req, res) => {
  await seedChallenges();
  const challenges = await Challenge.find().lean();
  const data = challenges.map((challenge) => ({
    id: challenge._id.toString(),
    title: challenge.title,
    description: challenge.description,
    points: challenge.points,
    target: challenge.target,
    progress: 0,
    completed: false,
  }));
  return res.json(data);
});

router.post('/complete', authenticate, async (req, res) => {
  const { challengeId } = req.body;
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) {
    return res.status(404).json({ message: 'Desafío no encontrado' });
  }
  await User.findByIdAndUpdate(req.userId, { $inc: { points: challenge.points } });
  return res.json({ success: true });
});

module.exports = router;
