import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteOption } from '../types';

type Props = {
  route: RouteOption;
  onPress?: () => void;
};

const RouteCard = ({ route, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{route.mode.toUpperCase()}</Text>
      <View style={styles.row}>
        <Text style={styles.meta}>{route.distanceKm} km</Text>
        <Text style={styles.meta}>{route.durationMin} min</Text>
        <Text style={styles.meta}>{route.costEur.toFixed(2)} €</Text>
        <Text style={styles.meta}>{route.co2Kg} kg CO2</Text>
      </View>
      <Text style={styles.steps}>{route.steps.join(' • ')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: 13,
    color: '#2F3A3D',
    marginRight: 8,
    marginBottom: 4,
  },
  steps: {
    marginTop: 8,
    color: '#6B7280',
  },
});

export default RouteCard;
