import { CO2_FACTORS_KG_PER_KM } from '../constants/config';
import { RouteMode } from '../types';

export const calculateCo2 = (distanceKm: number, mode: RouteMode) =>
  Number((distanceKm * CO2_FACTORS_KG_PER_KM[mode]).toFixed(2));
