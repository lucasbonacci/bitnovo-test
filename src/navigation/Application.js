import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Paths} from '@/navigation/paths';
import {ScreenA, ScreenB} from '@/screens';
import CurrencyModal from '@/components/CurrencyModal';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const [amount, setAmount] = useState(0);
  const [concept, setConcept] = useState('');
  const [currency, setCurrency] = useState({
    name: 'Dólar Estadounidense',
    code: 'USD',
  });

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={Paths.ScreenA}
            options={({navigation}) => ({
              headerShown: true,
              title: 'Crear Pago',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity
                  style={styles.currencyButton}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.currencyText}>{currency.code}</Text>
                </TouchableOpacity>
              ),
            })}>
            {props => (
              <ScreenA
                {...props}
                amount={amount}
                setAmount={setAmount}
                concept={concept}
                setConcept={setConcept}
                currency={currency}
              />
            )}
          </Stack.Screen>
          <Stack.Screen component={ScreenB} name={Paths.ScreenB} />
        </Stack.Navigator>
        <CurrencyModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectCurrency={setCurrency}
          selectedCurrency={currency}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;

const styles = StyleSheet.create({
  currencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 12,
  },
  currencyText: {
    fontSize: 16,
    color: '#000',
  },
});
