import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Paths} from '@/navigation/paths';
import {CrearPago, ScreenB} from '@/screens';
import CurrencyModal from '@/components/CurrencyModal';
import {SVG} from '@/assets/svg/index';
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
            name={Paths.CrearPago}
            options={({navigation}) => ({
              headerShown: true,
              title: <Text style={styles.headerTitle}>Crear Pago</Text>,
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity
                  style={styles.currencyButton}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.currencyText}>{currency.code}</Text>
                  <SVG.ArrowDown />
                </TouchableOpacity>
              ),
            })}>
            {() => (
              <CrearPago
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 12,
    flexDirection: 'row',
    backgroundColor: '#D3DCE64D',
  },
  currencyText: {
    fontFamily: 'Mulish-Bold',
    fontSize: 12,
    lineHeight: 16,
    color: '#002859',
    paddingRight: 8,
  },
  headerTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#002859',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
