import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Paths} from '@/navigation/paths';
import {
  CreatePayment,
  PaymentRequest,
  PaymentSuccess,
  QRCodePayment,
} from '@/screens';
import CurrencyModal from '@/components/CurrencyModal';
import {SVG} from '@/assets/svg/index';
const Stack = createStackNavigator();

function ApplicationNavigator() {
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
            name={Paths.CreatePayment}
            options={() => ({
              headerShown: true,
              headerLeft: () => null,
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
              title: <SVG.Logo />,
              headerTitleAlign: 'center',
            })}>
            {props => {
              const {navigation} = props;

              const handleFinish = () => {
                navigation.navigate(Paths.CreatePayment);
                setAmount(0);
                setConcept('');
              };

              return <PaymentSuccess {...props} onFinish={handleFinish} />;
            }}
          </Stack.Screen>
          <Stack.Screen
            name={Paths.QRCodePayment}
            options={props => ({
              headerShown: true,
              title: '',
              headerLeft: () => (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => props.navigation.goBack()}>
                  <SVG.BackArrow />
                </TouchableOpacity>
              ),
              headerTitleAlign: 'center',
            })}>
            {props => <QRCodePayment {...props} currency={currency} />}
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
