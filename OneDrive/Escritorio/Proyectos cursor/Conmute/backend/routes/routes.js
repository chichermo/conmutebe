const express = require('express');
const Route = require('../models/Route');
const { calculateCo2 } = require('../utils/co2');
const { fetchWeather, fetchSncbStatus, fetchStibStatus } = require('../services/externalApis');
const { generateRouteInsight } = require('../services/ai');

const router = express.Router();

const estimateDistanceKm = (originLabel, destinationLabel) => {
  const base = Math.max(originLabel.length, destinationLabel.length);
  return Number((base * 1.3).toFixed(1));
};

const buildRouteOption = (origin, destination, mode, distanceKm) => {
  const durationMin = Math.round(distanceKm * (mode === 'bike' ? 4 : 2.2));
  const costEur = Number(
    (distanceKm * (mode === 'train' ? 0.12 : mode === 'bus' ? 0.08 : 0.2)).toFixed(2),
  );
  const co2Kg = calculateCo2(distanceKm, mode);
  return {
    id: `${mode}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    origin,
    destination,
    mode,
    distanceKm,
    durationMin,
    costEur,
    co2Kg,
    steps: [`Inicio en ${origin.label}`, `Conectar con ${mode}`, `Llegada a ${destination.label}`],
  };
};

router.post('/optimize', async (req, res) => {
  const { origin, destination } = req.body;
  if (!origin?.label || !destination?.label) {
    return res.status(400).json({ message: 'Origen y destino requeridos' });
  }
  // Distancia estimada MVP: se reemplaza por cálculo real geoespacial.
  const distanceKm = estimateDistanceKm(origin.label, destination.label);
  const modes = ['bike', 'train', 'bus', 'ev'];
  const options = modes.map((mode) => buildRouteOption(origin, destination, mode, distanceKm));

  // Integraciones externas (OpenWeather + SNCB + STIB).
  const weather = await fetchWeather(origin.latitude ?? 50.85, origin.longitude ?? 4.35);
  const sncb = await fetchSncbStatus();
  const stib = await fetchStibStatus();

  const prompt = `Optimiza ruta de ${origin.label} a ${destination.label} en Bélgica minimizando CO2. Clima: ${weather.description}. Estado SNCB: ${sncb.message}. Estado STIB: ${stib.message}.`;
  const aiSummary = await generateRouteInsight(prompt);

  await Route.insertMany(
    options.map((option) => ({ ...option })),
  );

  return res.json({ options, aiSummary });
});

module.exports = router;
