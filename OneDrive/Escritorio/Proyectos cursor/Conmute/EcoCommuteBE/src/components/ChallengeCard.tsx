import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Challenge } from '../types';

type Props = {
  challenge: Challenge;
  onComplete?: () => void;
};

const ChallengeCard = ({ challenge, onComplete }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
      <View style={styles.row}>
        <Text style={styles.meta}>
          {challenge.progress}/{challenge.target}
        </Text>
        <Text style={styles.meta}>{challenge.points} pts</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, challenge.completed && styles.buttonDisabled]}
        onPress={onComplete}
        disabled={challenge.completed}
      >
        <Text style={styles.buttonText}>
          {challenge.completed ? 'Completado' : 'Marcar completo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    marginTop: 6,
    color: '#4B5563',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  meta: {
    color: '#111827',
    marginRight: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ChallengeCard;
