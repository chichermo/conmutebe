import axios from 'axios';
import { OPEN_WEATHER_BASE_URL } from '../constants/config';

const OPEN_WEATHER_KEY = '';

export const fetchWeather = async (latitude: number, longitude: number) => {
  if (!OPEN_WEATHER_KEY) {
    return { tempC: 12, description: 'nublado', source: 'mock' };
  }

  const { data } = await axios.get(`${OPEN_WEATHER_BASE_URL}/weather`, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: OPEN_WEATHER_KEY,
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

export const fetchSncbStatus = async () => {
  return {
    delays: false,
    message: 'Estado SNCB (mock): tráfico normal',
  };
};

export const fetchStibStatus = async () => {
  return {
    delays: false,
    message: 'Estado STIB (mock): tráfico normal',
  };
};
