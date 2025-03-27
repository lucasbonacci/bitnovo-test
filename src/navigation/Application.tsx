import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { Paths } from '@/navigation/paths';

import { ScreenA, ScreenB } from '@/screens';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  

  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator  screenOptions={{ headerShown: true }}>
          <Stack.Screen component={ScreenA} name={Paths.ScreenA} />
          <Stack.Screen component={ScreenB} name={Paths.ScreenB} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
