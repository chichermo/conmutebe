const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d',
  });

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email ya registrado' });
  }
  const user = await User.create({
    name,
    email,
    passwordHash: password,
  });
  const token = signToken(user.id);
  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      language: user.language,
      region: user.region,
      points: user.points,
      isPremium: user.isPremium,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
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
      isPremium: user.isPremium,
    },
  });
});

router.get('/profile', async (req, res) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json({
      id: user.id,
      name: user.name,
      language: user.language,
      region: user.region,
      points: user.points,
      isPremium: user.isPremium,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});

module.exports = router;
