import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {Button} from '@/components';

const CrearPago = ({currency = {code: 'EUR'}, navigation}) => {
  const [amount, setAmount] = useState(null);
  const [concept, setConcept] = useState('');

  const getCurrencyConfig = () => {
    switch (currency.code) {
      case 'USD':
        return {prefix: '$ ', suffix: ''};
      case 'EUR':
        return {prefix: '', suffix: ' €'};
      case 'GBP':
        return {prefix: '£ ', suffix: ''};
      default:
        return {prefix: '', suffix: ` ${currency.code}`};
    }
  };

  const getPlaceholder = () => {
    const {prefix, suffix} = getCurrencyConfig();
    return `${prefix}0.00${suffix} `;
  };

  const {prefix, suffix} = getCurrencyConfig();

  const handleContinue = () => {
    console.log('Monto:', amount);
    console.log('Concepto:', concept);
    console.log('Moneda:', currency);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.amountContainer}>
          <CurrencyInput
            value={amount}
            onChangeValue={setAmount}
            prefix={prefix}
            suffix={suffix}
            delimiter=","
            separator="."
            precision={2}
            minValue={0}
            style={styles.amountText}
            placeholder={getPlaceholder()}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.conceptLabel}>Concepto</Text>
        <View style={styles.conceptContainer}>
          <TextInput
            style={styles.conceptInput}
            placeholder="Añade descripción del pago"
            value={concept}
            onChangeText={setConcept}
            maxLength={140}
            multiline
          />
        </View>
        {concept.length > 0 && (
          <Text style={styles.charCount}>
            {concept.length} / 140 caracteres
          </Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          label="Continuar"
          disabled={!amount || amount <= 0}
          variant="primary"
          onPress={handleContinue}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CrearPago;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 100,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 40,
    lineHeight: 50,
    fontFamily: 'Mulish-Bold',
    color: '#035AC5',
  },
  conceptContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  conceptInput: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    lineHeight: 20,
    letterSpacing: 0.2,
    paddingVertical: 12,
    color: '#647184',
  },
  conceptLabel: {
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    marginBottom: 5,
  },

  buttonContainer: {
    marginBottom: 20,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'Mulish-Regular',
    fontFamily: 'Mulish-Regular',
    color: '#647184',

    marginRight: 4,
  },
});
