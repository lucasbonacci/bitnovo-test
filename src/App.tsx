import React from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ApplicationNavigator from '@/navigation/Application';

function App() {
  return (
    <GestureHandlerRootView>
      <ApplicationNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
