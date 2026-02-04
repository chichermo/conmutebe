require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./config/db');
const authRoutes = require('./routes/auth');
const routesRoutes = require('./routes/routes');
const challengeRoutes = require('./routes/challenges');
const rewardRoutes = require('./routes/rewards');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/routes', routesRoutes);
app.use('/challenges', challengeRoutes);
app.use('/rewards', rewardRoutes);

connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`EcoCommute BE API en puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  });
