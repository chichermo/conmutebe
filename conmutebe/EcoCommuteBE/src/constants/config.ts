import { Platform } from 'react-native';

const DEV_API_BASE_URL =
  Platform.select({
    android: 'http://10.0.2.2:4000',
    ios: 'http://localhost:4000',
    default: 'http://localhost:4000',
  }) || 'http://localhost:4000';

const PROD_API_BASE_URL = 'https://conmutebe.vercel.app/api';

export const API_BASE_URL = __DEV__ ? DEV_API_BASE_URL : PROD_API_BASE_URL;

export const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const CO2_FACTORS_KG_PER_KM = {
  bike: 0,
  train: 0.05,
  bus: 0.1,
  ev: 0.07,
} as const;

export const DEFAULT_REGION = 'flanders';
export const DEFAULT_LANGUAGE = 'nl';

export const STRIPE_PUBLISHABLE_KEY = '';

export const GEMINI_API_KEY = '';
