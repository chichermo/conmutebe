import { apiClient } from './api';
import { LocationInput, RouteOption } from '../types';

type OptimizeResponse = {
  options: RouteOption[];
  aiSummary: string;
};

export const optimizeRoutes = async (
  origin: LocationInput,
  destination: LocationInput,
): Promise<OptimizeResponse> => {
  const { data } = await apiClient.post<OptimizeResponse>('/routes/optimize', {
    origin,
    destination,
  });
  return data;
};
