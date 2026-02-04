const { withCors } = require('../_utils/response');
const { getSupabaseClient } = require('../_utils/supabase');
const { calculateCo2 } = require('../_utils/co2');
const { fetchWeather, fetchSncbStatus, fetchStibStatus } = require('../_utils/externalApis');
const { generateRouteInsight } = require('../_utils/ai');

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

module.exports = withCors(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { origin, destination } = req.body || {};
  if (!origin?.label || !destination?.label) {
    return res.status(400).json({ message: 'Origen y destino requeridos' });
  }

  const distanceKm = estimateDistanceKm(origin.label, destination.label);
  const modes = ['bike', 'train', 'bus', 'ev'];
  const options = modes.map((mode) => buildRouteOption(origin, destination, mode, distanceKm));

  const weather = await fetchWeather(origin.latitude ?? 50.85, origin.longitude ?? 4.35);
  const sncb = await fetchSncbStatus();
  const stib = await fetchStibStatus();
  const prompt = `Optimiza ruta de ${origin.label} a ${destination.label} en Bélgica minimizando CO2. Clima: ${weather.description}. Estado SNCB: ${sncb.message}. Estado STIB: ${stib.message}.`;
  const aiSummary = await generateRouteInsight(prompt);

  const supabase = getSupabaseClient();
  await supabase.from('routes').insert(
    options.map((option) => ({
      origin_label: option.origin.label,
      origin_lat: option.origin.latitude,
      origin_lng: option.origin.longitude,
      destination_label: option.destination.label,
      destination_lat: option.destination.latitude,
      destination_lng: option.destination.longitude,
      mode: option.mode,
      distance_km: option.distanceKm,
      duration_min: option.durationMin,
      cost_eur: option.costEur,
      co2_kg: option.co2Kg,
      steps: option.steps,
    })),
  );

  return res.json({ options, aiSummary });
});
