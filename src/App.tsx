import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ApplicationNavigator from '@/navigation/Application';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ApplicationNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
