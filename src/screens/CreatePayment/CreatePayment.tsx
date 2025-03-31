import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {Button} from '@/components';
import * as NavigationService from '@/navigation/NavigationService';
import {Paths} from '@/navigation/paths';

interface Currency {
  name: string;
  code: string;
}

interface CreatePaymentProps {
  currency: Currency;
}

const CreatePayment: React.FC<CreatePaymentProps> = ({currency}) => {
  const [amount, setAmount] = useState<number>(0);
  const [concept, setConcept] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleContinue = async () => {
    try {
      const formData = new FormData();
      formData.append('expected_output_amount', amount);
      formData.append('fiat', currency.code);
      formData.append('notes', concept);

      setLoading(true);
      const deviceId = 'd497719b-905f-4a41-8dbe-cf124c442f42';
      const response = await fetch(
        'https://payments.pre-bnvo.com/api/v1/orders/',
        {
          method: 'POST',
          headers: {
            'X-Device-Id': deviceId,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Error desconocido');
      }

      const data = await response.json();

      NavigationService.reset(Paths.PaymentRequest, {
        data: {...data, amount, prefix, suffix},
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            onChangeValue={value => setAmount(value ?? 0)}
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
            placeholderTextColor="#647184"
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
          loading={loading}
          onPress={handleContinue}
          icon={null}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePayment;

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
    color: '#647184',
    marginRight: 4,
  },
});
