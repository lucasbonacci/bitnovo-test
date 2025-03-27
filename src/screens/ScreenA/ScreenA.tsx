import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import type {RootScreenProps} from '@/navigation/types';
import {Paths} from '@/navigation/paths';

type CreatePaymentProps = {
  amount: number | null;
  setAmount: React.Dispatch<React.SetStateAction<number | null>>;
  concept: string;
  setConcept: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
  navigation: RootScreenProps<Paths.ScreenA>;
};

const ScreenA: React.FC<CreatePaymentProps> = ({
  amount,
  setAmount,
  concept,
  setConcept,
  currency,
  navigation,
}) => {
  const handleContinue = () => {
    console.log('Monto:', amount);
    console.log('Concepto:', concept);
    console.log('Moneda:', currency);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.amountContainer}>
        <CurrencyInput
          value={amount}
          onChangeValue={setAmount}
          prefix="$ "
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          style={styles.amountText}
          placeholder="$ 0.00"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.conceptContainer}>
        <TextInput
          style={styles.conceptInput}
          placeholder="Añade descripción del pago"
          value={concept}
          onChangeText={setConcept}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Continuar" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default ScreenA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  currencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  currencyText: {
    fontSize: 16,
    color: '#000',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000',
  },
  conceptContainer: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  conceptInput: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
