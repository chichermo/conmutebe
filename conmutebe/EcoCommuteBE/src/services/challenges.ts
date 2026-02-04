import { apiClient } from './api';
import { Challenge, Reward } from '../types';

export const fetchChallenges = async (): Promise<Challenge[]> => {
  const { data } = await apiClient.get<Challenge[]>('/challenges');
  return data;
};

export const completeChallenge = async (challengeId: string) => {
  const { data } = await apiClient.post('/challenges/complete', { challengeId });
  return data;
};

export const fetchRewards = async (): Promise<Reward[]> => {
  const { data } = await apiClient.get<Reward[]>('/rewards');
  return data;
};

export const redeemReward = async (rewardId: string) => {
  const { data } = await apiClient.post('/rewards/redeem', { rewardId });
  return data;
};
