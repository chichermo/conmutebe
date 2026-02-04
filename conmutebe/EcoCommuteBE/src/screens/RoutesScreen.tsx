import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useRoutes } from '../hooks/useRoutes';
import RouteCard from '../components/RouteCard';
import { t } from '../context/LocaleContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Routes'>;

const RoutesScreen = ({ route, navigation }: Props) => {
  const { origin, destination } = route.params;
  const { routes, aiSummary, loading, optimize, loadCachedRoutes } = useRoutes();

  useEffect(() => {
    loadCachedRoutes();
    optimize(origin, destination);
  }, [origin, destination, loadCachedRoutes, optimize]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('routesTitle')}</Text>
      <Text style={styles.subtitle}>{aiSummary}</Text>
      {loading && <ActivityIndicator size="large" color="#0F766E" />}
      {!loading && routes.length === 0 && (
        <Text style={styles.empty}>No hay rutas aún. Intenta de nuevo.</Text>
      )}
      {routes.map(item => (
        <RouteCard
          key={item.id}
          route={item}
          onPress={() => navigation.navigate('Map', { routeId: item.id })}
        />
      ))}
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#4B5563',
    marginBottom: 16,
  },
  empty: {
    color: '#6B7280',
    marginTop: 12,
  },
});

export default RoutesScreen;
