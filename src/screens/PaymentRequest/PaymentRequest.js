import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {SVG} from '@/assets/svg/index';
import {Button, SuccessModal} from '@/components';

const PaymentRequest = ({route, navigation}) => {
  const data = route.params.data;
  const formattedAmount = `${data.amount} ${data.fiat}`;
  const formattedUrl = data.web_url.replace(/^https?:\/\//, '');
  const [modalVisible, setModalVisible] = useState(false);

  const createNewPayment = () => {
    navigation.navigate('CreatePayment');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.amountCard}>
          <View style={styles.iconRow}>
            <SVG.MoneyTime />
            <View style={styles.textIcon}>
              <Text style={styles.title}>Solicitud de pago</Text>

              <Text style={styles.amount}>{formattedAmount}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            Comparte el enlace de pago con el cliente
          </Text>
        </View>

        <View style={styles.linkRow}>
          <View style={styles.optionButton}>
            <SVG.Link />
            <Text style={styles.optionText}>{formattedUrl}</Text>
          </View>
          <Button
            label="Copiar enlace"
            variant="iconOnly"
            icon={<SVG.ScanBarCode />}
          />
        </View>
        <TouchableOpacity style={styles.optionButton}>
          <SVG.Email />
          <Text style={styles.optionText}>Enviar por correo electrónico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <SVG.WhatApp />
          <Text style={styles.optionText}>Enviar a número de WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <SVG.Share />
          <Text style={styles.optionText}>
            Compartir con otras aplicaciones
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="Nueva solicitud"
          variant="secondary"
          icon={<SVG.AddWallet />}
          onPress={() => createNewPayment()}
        />
      </View>
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default PaymentRequest;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 4,
    justifyContent: 'space-between',
  },
  card: {
    padding: 20,
    marginTop: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 8,
  },
  textIcon: {
    marginLeft: 16,
  },
  amountCard: {
    backgroundColor: '#F9FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Mulish-Regular',
    color: '#647184',
    textAlign: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Mulish-Regular',
    color: '#647184',
    textAlign: 'left',
    marginBottom: 4,
  },
  amount: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    textAlign: 'left',
  },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#002859',
    marginLeft: 12,
    fontFamily: 'Mulish-Regular',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
