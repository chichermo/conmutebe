import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { RouteOption } from '../types';
import { getObject } from '../utils/storage';
import { t } from '../context/LocaleContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

const CACHE_KEY = 'ecocommute.routes.cache';

const MapScreen = ({ route }: Props) => {
  const { routeId } = route.params ?? {};
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    const loadRoutes = async () => {
      const cached = await getObject<RouteOption[]>(CACHE_KEY);
      if (cached) {
        setRoutes(cached);
      }
    };
    loadRoutes();
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const selectedRoute = useMemo(
    () => routes.find(item => item.id === routeId) || routes[0],
    [routes, routeId],
  );

  const region = useMemo(() => {
    return {
      latitude: selectedRoute?.origin.latitude ?? 50.85,
      longitude: selectedRoute?.origin.longitude ?? 4.35,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    };
  }, [selectedRoute]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {selectedRoute && (
          <>
            <Marker
              coordinate={{
                latitude: selectedRoute.origin.latitude ?? 50.85,
                longitude: selectedRoute.origin.longitude ?? 4.35,
              }}
              title={selectedRoute.origin.label}
            />
            <Marker
              coordinate={{
                latitude: selectedRoute.destination.latitude ?? 51.05,
                longitude: selectedRoute.destination.longitude ?? 3.72,
              }}
              title={selectedRoute.destination.label}
            />
            <Polyline
              coordinates={[
                {
                  latitude: selectedRoute.origin.latitude ?? 50.85,
                  longitude: selectedRoute.origin.longitude ?? 4.35,
                },
                {
                  latitude: selectedRoute.destination.latitude ?? 51.05,
                  longitude: selectedRoute.destination.longitude ?? 3.72,
                },
              ]}
              strokeColor="#0F766E"
              strokeWidth={4}
            />
          </>
        )}
      </MapView>
      {/* Overlay AR básico con huella de CO2 */}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          {t('co2Footprint')}: {selectedRoute?.co2Kg ?? 0} kg
        </Text>
        <Text style={styles.overlayTextSmall}>AR overlay (MVP)</Text>
      </View>
      {/* Vista de cámara para prototipo AR (inactiva hasta premium). */}
      {hasPermission && device && (
        <Camera
          style={styles.camera}
          isActive={false}
          device={device}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(15, 118, 110, 0.85)',
    padding: 12,
    borderRadius: 10,
  },
  overlayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  overlayTextSmall: {
    color: '#E5E7EB',
    marginTop: 4,
  },
  camera: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 120,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default MapScreen;
