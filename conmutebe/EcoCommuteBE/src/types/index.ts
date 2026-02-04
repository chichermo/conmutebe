export type RouteMode = 'bike' | 'train' | 'bus' | 'ev';

export type LocationInput = {
  label: string;
  latitude?: number;
  longitude?: number;
};

export type RouteOption = {
  id: string;
  origin: LocationInput;
  destination: LocationInput;
  mode: RouteMode;
  distanceKm: number;
  durationMin: number;
  costEur: number;
  co2Kg: number;
  steps: string[];
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  completed: boolean;
};

export type Reward = {
  id: string;
  name: string;
  pointsCost: number;
  partner: string;
};

export type UserProfile = {
  id: string;
  name: string;
  region: 'flanders' | 'wallonia' | 'brussels' | 'german';
  language: 'nl' | 'fr' | 'de';
  points: number;
  isPremium: boolean;
};
