import { apiClient } from './api';
import { UserProfile } from '../types';

type AuthResponse = {
  token: string;
  user: UserProfile;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', {
    email,
    password,
  });
  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', {
    name,
    email,
    password,
  });
  return data;
};

export const fetchProfile = async (token: string): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
