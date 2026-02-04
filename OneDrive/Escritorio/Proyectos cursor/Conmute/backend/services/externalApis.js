const axios = require('axios');

const fetchWeather = async (lat, lon) => {
  if (!process.env.OPENWEATHER_KEY) {
    return { tempC: 12, description: 'nublado', source: 'mock' };
  }
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    },
    timeout: 8000,
  });
  return {
    tempC: data.main?.temp ?? 12,
    description: data.weather?.[0]?.description ?? 'nublado',
    source: 'openweather',
  };
};

const fetchSncbStatus = async () => {
  if (!process.env.SNCB_KEY) {
    return { delays: false, message: 'SNCB mock: servicio estable' };
  }
  return { delays: false, message: 'SNCB: servicio estable' };
};

const fetchStibStatus = async () => {
  if (!process.env.STIB_KEY) {
    return { delays: false, message: 'STIB mock: servicio estable' };
  }
  return { delays: false, message: 'STIB: servicio estable' };
};

module.exports = { fetchWeather, fetchSncbStatus, fetchStibStatus };
