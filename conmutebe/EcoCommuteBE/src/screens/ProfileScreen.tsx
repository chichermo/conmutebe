import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLocale, t } from '../context/LocaleContext';
import LanguageSelector from '../components/LanguageSelector';
import { fetchRewards, redeemReward } from '../services/challenges';
import { Reward } from '../types';
import { setupStripe, startPremiumCheckout } from '../services/payments';

const ProfileScreen = () => {
  const { user, signUp } = useAuth();
  const { language, region } = useLocale();
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    setupStripe();
  }, []);

  useEffect(() => {
    const loadRewards = async () => {
      const data = await fetchRewards();
      setRewards(data);
    };
    loadRewards();
  }, []);

  const handlePremium = async () => {
    const result = await startPremiumCheckout();
    if (result.success) {
      Alert.alert('Premium', 'Premium activado en modo demo.');
    }
  };

  const handleRedeem = async (rewardId: string) => {
    await redeemReward(rewardId);
    Alert.alert('Canje', 'Recompensa canjeada.');
  };

  const handleDemoLogin = async () => {
    try {
      await signUp('Demo Eco', 'demo@ecocommute.be', 'demo');
    } catch (error) {
      Alert.alert('Demo', 'Usuario demo ya existe o error en registro.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('profileTitle')}</Text>
      <View style={styles.card}>
        <Text style={styles.meta}>Usuario: {user?.name ?? 'Invitado'}</Text>
        <Text style={styles.meta}>Idioma: {language.toUpperCase()}</Text>
        <Text style={styles.meta}>Región: {region}</Text>
        <Text style={styles.meta}>
          {t('points')}: {user?.points ?? 0}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.secondaryButton, styles.demoButton]}
        onPress={handleDemoLogin}
      >
        <Text style={styles.secondaryButtonText}>Crear usuario demo</Text>
      </TouchableOpacity>
      <LanguageSelector />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('premium')}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handlePremium}>
          <Text style={styles.primaryButtonText}>{t('activatePremium')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recompensas locales</Text>
        {rewards.map(item => (
          <View key={item.id} style={styles.rewardRow}>
            <Text style={styles.rewardText}>
              {item.name} · {item.pointsCost} pts
            </Text>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleRedeem(item.id)}
            >
              <Text style={styles.secondaryButtonText}>Canjear</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  meta: {
    marginBottom: 6,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#0F766E',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
  },
  rewardText: {
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  demoButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  secondaryButtonText: {
    color: '#0369A1',
    fontWeight: '600',
  },
});

export default ProfileScreen;
