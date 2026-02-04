import i18n from 'i18n-js';
import { DEFAULT_LANGUAGE } from '../constants/config';

const translations = {
  nl: {
    homeTitle: 'EcoCommute BE',
    origin: 'Oorsprong',
    destination: 'Bestemming',
    optimize: 'Route optimaliseren',
    routesTitle: 'Aanbevolen routes',
    mapTitle: 'Kaart',
    challengesTitle: 'Uitdagingen',
    profileTitle: 'Profiel',
    points: 'Punten',
    premium: 'Premium',
    activatePremium: 'Premium activeren',
    language: 'Taal',
    region: 'Regio',
    co2Footprint: 'CO2-voetafdruk',
  },
  fr: {
    homeTitle: 'EcoCommute BE',
    origin: 'Origine',
    destination: 'Destination',
    optimize: 'Optimiser le trajet',
    routesTitle: 'Itinéraires recommandés',
    mapTitle: 'Carte',
    challengesTitle: 'Défis',
    profileTitle: 'Profil',
    points: 'Points',
    premium: 'Premium',
    activatePremium: 'Activer Premium',
    language: 'Langue',
    region: 'Région',
    co2Footprint: 'Empreinte CO2',
  },
  de: {
    homeTitle: 'EcoCommute BE',
    origin: 'Start',
    destination: 'Ziel',
    optimize: 'Route optimieren',
    routesTitle: 'Empfohlene Routen',
    mapTitle: 'Karte',
    challengesTitle: 'Herausforderungen',
    profileTitle: 'Profil',
    points: 'Punkte',
    premium: 'Premium',
    activatePremium: 'Premium aktivieren',
    language: 'Sprache',
    region: 'Region',
    co2Footprint: 'CO2-Fußabdruck',
  },
};

i18n.translations = translations;
i18n.fallbacks = true;
i18n.locale = DEFAULT_LANGUAGE;

export const setI18nLocale = (locale: string) => {
  i18n.locale = locale || DEFAULT_LANGUAGE;
};

export default i18n;
