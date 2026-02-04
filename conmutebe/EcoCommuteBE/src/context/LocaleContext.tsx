import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getLocales } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE, DEFAULT_REGION } from '../constants/config';
import i18n, { setI18nLocale } from '../i18n';
import { UserProfile } from '../types';

type LocaleContextValue = {
  language: UserProfile['language'];
  region: UserProfile['region'];
  setLanguage: (language: UserProfile['language']) => Promise<void>;
  setRegion: (region: UserProfile['region']) => Promise<void>;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const LANGUAGE_KEY = 'ecocommute.language';
const REGION_KEY = 'ecocommute.region';

const getDeviceLanguage = (): UserProfile['language'] => {
  const [locale] = getLocales();
  const languageCode = locale?.languageCode?.toLowerCase();
  if (languageCode === 'fr' || languageCode === 'de' || languageCode === 'nl') {
    return languageCode;
  }
  return DEFAULT_LANGUAGE as UserProfile['language'];
};

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<UserProfile['language']>(
    DEFAULT_LANGUAGE as UserProfile['language'],
  );
  const [region, setRegionState] = useState<UserProfile['region']>(
    DEFAULT_REGION as UserProfile['region'],
  );

  useEffect(() => {
    const loadLocale = async () => {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      const storedRegion = await AsyncStorage.getItem(REGION_KEY);
      const initialLanguage =
        (storedLanguage as UserProfile['language']) || getDeviceLanguage();
      const initialRegion =
        (storedRegion as UserProfile['region']) ||
        (DEFAULT_REGION as UserProfile['region']);
      setLanguageState(initialLanguage);
      setRegionState(initialRegion);
      setI18nLocale(initialLanguage);
    };
    loadLocale();
  }, []);

  const setLanguage = async (nextLanguage: UserProfile['language']) => {
    setLanguageState(nextLanguage);
    setI18nLocale(nextLanguage);
    await AsyncStorage.setItem(LANGUAGE_KEY, nextLanguage);
  };

  const setRegion = async (nextRegion: UserProfile['region']) => {
    setRegionState(nextRegion);
    await AsyncStorage.setItem(REGION_KEY, nextRegion);
  };

  const value = useMemo(
    () => ({
      language,
      region,
      setLanguage,
      setRegion,
    }),
    [language, region],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale debe usarse dentro de LocaleProvider');
  }
  return context;
};

export const t = (key: keyof typeof i18n.translations.nl) => i18n.t(key);
