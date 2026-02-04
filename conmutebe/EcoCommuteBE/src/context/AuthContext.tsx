import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register, fetchProfile } from '../services/auth';
import { setAuthToken } from '../services/api';
import { UserProfile } from '../types';

type AuthContextValue = {
  user: UserProfile | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'ecocommute.token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        const profile = await fetchProfile(storedToken);
        setUser(profile);
      }
    };
    loadSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    setToken(response.token);
    setAuthToken(response.token);
    setUser(response.user);
    await AsyncStorage.setItem(TOKEN_KEY, response.token);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const response = await register(name, email, password);
    setToken(response.token);
    setAuthToken(response.token);
    setUser(response.user);
    await AsyncStorage.setItem(TOKEN_KEY, response.token);
  };

  const signOut = async () => {
    setToken(null);
    setAuthToken(null);
    setUser(null);
    await AsyncStorage.removeItem(TOKEN_KEY);
  };

  const refreshProfile = async () => {
    if (!token) {
      return;
    }
    const profile = await fetchProfile(token);
    setUser(profile);
  };

  const value = useMemo(
    () => ({ user, token, signIn, signUp, signOut, refreshProfile }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
