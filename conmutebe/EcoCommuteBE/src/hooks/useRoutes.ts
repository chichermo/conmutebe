import { useCallback, useState } from 'react';
import { optimizeRoutes } from '../services/routes';
import { generateGeminiSummary } from '../services/gemini';
import { fetchSncbStatus, fetchStibStatus, fetchWeather } from '../services/externalApis';
import { LocationInput, RouteOption } from '../types';
import { getObject, storeObject } from '../utils/storage';

const CACHE_KEY = 'ecocommute.routes.cache';

export const useRoutes = () => {
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Cache offline básico para modo sin conexión.
  const loadCachedRoutes = useCallback(async () => {
    const cached = await getObject<RouteOption[]>(CACHE_KEY);
    if (cached) {
      setRoutes(cached);
    }
  }, []);

  const optimize = useCallback(async (origin: LocationInput, destination: LocationInput) => {
    setLoading(true);
    try {
      const response = await optimizeRoutes(origin, destination);
      setRoutes(response.options);
      setAiSummary(response.aiSummary);
      await storeObject(CACHE_KEY, response.options);

      const weather = await fetchWeather(origin.latitude ?? 50.85, origin.longitude ?? 4.35);
      const sncb = await fetchSncbStatus();
      const stib = await fetchStibStatus();
      const prompt = `Optimiza ruta de ${origin.label} a ${destination.label} en Bélgica minimizando CO2, integrando clima ${weather.description} y tráfico ${sncb.message}/${stib.message}.`;
      const summary = await generateGeminiSummary(prompt);
      setAiSummary(summary);
    } catch (error) {
      setAiSummary('No se pudo optimizar. Verifica el backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    routes,
    aiSummary,
    loading,
    optimize,
    loadCachedRoutes,
  };
};
