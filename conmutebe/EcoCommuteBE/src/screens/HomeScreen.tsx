import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { t } from '../context/LocaleContext';
import { LocationInput } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [origin, setOrigin] = useState<LocationInput>({ label: 'Bruselas' });
  const [destination, setDestination] = useState<LocationInput>({ label: 'Gante' });

  const handleUseLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setOrigin({
          label: 'Ubicación actual',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        Alert.alert('Ubicación', 'No se pudo obtener la ubicación.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('homeTitle')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('origin')}
        value={origin.label}
        onChangeText={text => setOrigin(prev => ({ ...prev, label: text }))}
      />
      <TouchableOpacity style={styles.secondaryButton} onPress={handleUseLocation}>
        <Text style={styles.secondaryText}>Usar ubicación actual</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={t('destination')}
        value={destination.label}
        onChangeText={text => setDestination(prev => ({ ...prev, label: text }))}
      />
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Routes', { origin, destination })}
      >
        <Text style={styles.primaryButtonText}>{t('optimize')}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Map', {})}
        >
          <Text style={styles.secondaryText}>{t('mapTitle')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Challenges')}
        >
          <Text style={styles.secondaryText}>{t('challengesTitle')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.secondaryText}>{t('profileTitle')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: '#0F766E',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  secondaryButton: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  secondaryText: {
    color: '#0369A1',
    fontWeight: '600',
  },
});

export default HomeScreen;
