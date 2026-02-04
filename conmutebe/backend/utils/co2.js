const CO2_FACTORS = {
  bike: 0,
  train: 0.05,
  bus: 0.1,
  ev: 0.07,
};

const calculateCo2 = (distanceKm, mode) => {
  const factor = CO2_FACTORS[mode] ?? 0.1;
  return Number((distanceKm * factor).toFixed(2));
};

module.exports = { calculateCo2, CO2_FACTORS };
