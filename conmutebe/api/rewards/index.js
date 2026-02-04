const { withCors } = require('../_utils/response');

const rewards = [
  { id: 'reward-1', name: 'Cerveza Flandes', pointsCost: 120, partner: 'Flandes Bar' },
  { id: 'reward-2', name: 'Café de Bruselas', pointsCost: 80, partner: 'Brussels Café' },
];

module.exports = withCors(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }
  res.json(rewards);
});
