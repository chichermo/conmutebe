import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RoutesScreen from '../screens/RoutesScreen';
import MapScreen from '../screens/MapScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { LocationInput } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Routes: { origin: LocationInput; destination: LocationInput };
  Map: { routeId?: string };
  Challenges: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EcoCommute' }} />
      <Stack.Screen name="Routes" component={RoutesScreen} options={{ title: 'Rutas' }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
      <Stack.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{ title: 'Desafíos' }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
