import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './NavigationService';
import * as NavigationService from '@/navigation/NavigationService';
import {Paths} from '@/navigation/paths';
import {
  CreatePayment,
  PaymentRequest,
  PaymentSuccess,
  QRCodePayment,
} from '@/screens';
import CurrencyModal from '@/components/CurrencyModal';
import {SVG} from '@/assets/svg/index';
import {RootStackParamList} from './types';


const Stack = createStackNavigator<RootStackParamList>();

interface Currency {
  name: string;
  code: string;
}

function ApplicationNavigator() {
  const [currency, setCurrency] = useState<Currency>({
    name: 'Dólar Estadounidense',
    code: 'USD',
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: true}}>
          <Stack.Screen
            name={Paths.CreatePayment}
            options={() => ({
              headerShown: true,
              headerLeft: () => null,
              title: 'Crear Pago',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity
                  style={styles.currencyButton}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.currencyText}> {currency.code} </Text>
                  <SVG.ArrowDown />
                </TouchableOpacity>
              ),
            })}>
            {props => <CreatePayment {...props} currency={currency} />}
          </Stack.Screen>
          <Stack.Screen
            name={Paths.PaymentRequest}
            options={() => ({
              headerShown: false,
            })}>
            {props => <PaymentRequest {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name={Paths.PaymentSuccess}
            options={() => ({
              headerShown: true,
              title: 'Payment Success',
              headerTitleAlign: 'center',
              headerLeft: () => null,
            })}>
            {() => <PaymentSuccess />}
          </Stack.Screen>
          <Stack.Screen
            name={Paths.QRCodePayment}
            options={() => ({
              headerShown: true,
              title: '',
              headerLeft: () => (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => NavigationService.goBack()}>
                  <SVG.BackArrow />
                </TouchableOpacity>
              ),
              headerTitleAlign: 'center',
            })}>
            {props => <QRCodePayment {...props} />}
          </Stack.Screen>
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

export default ApplicationNavigator;
