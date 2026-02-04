import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { t, useLocale } from '../context/LocaleContext';
import { UserProfile } from '../types';

const LANGUAGES: Array<UserProfile['language']> = ['nl', 'fr', 'de'];
const REGIONS: Array<UserProfile['region']> = ['flanders', 'wallonia', 'brussels', 'german'];

const LanguageSelector = () => {
  const { language, region, setLanguage, setRegion } = useLocale();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('language')}</Text>
      <View style={styles.row}>
        {LANGUAGES.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, item === language && styles.chipActive]}
            onPress={() => setLanguage(item)}
          >
            <Text style={styles.chipText}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.label, styles.section]}>{t('region')}</Text>
      <View style={styles.row}>
        {REGIONS.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, item === region && styles.chipActive]}
            onPress={() => setRegion(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  section: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: '#CBD5F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#38BDF8',
  },
  chipText: {
    fontSize: 12,
  },
});

export default LanguageSelector;
