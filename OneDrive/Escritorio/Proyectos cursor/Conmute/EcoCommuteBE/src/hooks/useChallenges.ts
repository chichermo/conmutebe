import { useCallback, useEffect, useState } from 'react';
import { completeChallenge, fetchChallenges } from '../services/challenges';
import { Challenge } from '../types';

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);

  const loadChallenges = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchChallenges();
      setChallenges(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const markComplete = useCallback(async (challengeId: string) => {
    await completeChallenge(challengeId);
    await loadChallenges();
  }, [loadChallenges]);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  return { challenges, loading, markComplete };
};
