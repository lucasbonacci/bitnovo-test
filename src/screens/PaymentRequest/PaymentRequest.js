import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
  TextInput,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {SVG} from '@/assets/svg/index';
import {Button, SuccessModal, CountryModal} from '@/components';
import {usePaymentSocket} from '@/hooks/usePaymentSocket';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

const PaymentRequest = ({route, navigation}) => {
  const {amount, prefix, suffix, fiat, web_url, identifier} = route.params.data;

  const formattedAmount = `${prefix}${amount.toFixed(2)}${suffix}`;
  const formattedUrl = web_url.replace(/^https?:\/\//, '');
  const fullUrl = web_url;
  const [selectedCountry, setSelectedCountry] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    subtitle: '',
    type: '',
  });

  usePaymentSocket(identifier, 'payment', message => {
    if (message.status === 'CO') {
      navigation.navigate('PaymentSuccess');
    }

    if (message.status === 'AC') {
      setModalContent({
        title: 'Esperando confirmacion',
        subtitle: 'Pago recibido pero no confirmado aún',
        type: 'loading',
      });
      setModalVisible(true);
    }
  });

  const handleCopyLink = () => {
    Clipboard.setString(fullUrl);
    setModalVisible(true);
    setModalContent({
      title: 'Éxito',
      subtitle: 'Se ha copiado el enlace correctamente.',
      type: 'success',
    });
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Solicitud de pago');
    const body = encodeURIComponent(
      `Hola, te comparto el enlace de pago: ${fullUrl}`,
    );
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    Linking.openURL(mailtoUrl)
      .then(() => {
        setModalContent({
          title: 'Correo',
          subtitle:
            'Se ha abierto tu cliente de correo para compartir el enlace.',
          type: 'success',
        });

        setModalVisible(true);
      })
      .catch(err => console.error('Error al abrir el cliente de correo', err));
  };

  const handleSendWhatsApp = () => {
    const fullPhoneNumber = `${selectedCountry.code}${phoneNumber}`.replace(
      /\D/g,
      '',
    );

    const message = encodeURIComponent(
      `Hola, te comparto mi enlace de pago: ${fullUrl}`,
    );
    const url = `whatsapp://send?phone=${fullPhoneNumber}&text=${message}`;
    Linking.openURL(url)
      .then(() => {
        setModalContent({
          title: 'WhatsApp',
          subtitle:
            'Se ha abierto WhatsApp para compartir el enlace a su contacto.',
          type: 'success',
        });
        setModalVisible(true);
      })
      .catch(err =>
        console.error('Asegúrate de tener WhatsApp instalado', err),
      );
  };

  const isPhoneValid = (phone, country) => {
    const parsed = parsePhoneNumberFromString(phone, country);

    return parsed?.isValid() || false;
  };

  const handleShareLink = async () => {
    try {
      const result = await Share.share({
        message: `Hola, te comparto mi enlace de pago: ${fullUrl}`,
      });

      if (result.action === Share.sharedAction) {
        setModalContent({
          title: 'Diálogo de compartir',
          subtitle: 'Se ha abierto el diálogo para compartir el enlace.',
          type: 'loading',
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.log('Error al compartir', error);
    }
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
          <TouchableOpacity
            onPress={handleCopyLink}
            style={[styles.optionButton, {flex: 1, marginRight: 8}]}>
            <SVG.Link />
            <Text style={styles.optionText}>{formattedUrl}</Text>
          </TouchableOpacity>
          <Button
            label="Copiar enlace"
            variant="iconOnly"
            onPress={() =>
              navigation.navigate('QRCodePayment', {
                fullUrl,
                amount: formattedAmount,
                identifier,
              })
            }
            icon={<SVG.ScanBarCode />}
          />
        </View>

        <TouchableOpacity style={styles.optionButton} onPress={handleSendEmail}>
          <SVG.Email />
          <Text style={styles.optionText}>Enviar por correo electrónico</Text>
        </TouchableOpacity>

        {Object.keys(selectedCountry).length === 0 ? (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setCountryModalVisible(true)}>
            <SVG.WhatApp />
            <Text style={styles.optionText}>Enviar a número de WhatsApp</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.optionButton, {paddingVertical: 6}]}>
            <TouchableOpacity
              onPress={() => setCountryModalVisible(true)}
              style={styles.countrySection}>
              <SVG.WhatApp />
              <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
              <SVG.ArrowDown style={{marginLeft: 4}} />
            </TouchableOpacity>

            <TextInput
              placeholder="300 678 9087"
              style={styles.numberInput}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor="#647184"
            />

            <Button
              label="Enviar"
              variant="small"
              onPress={handleSendWhatsApp}
              disabled={!isPhoneValid(phoneNumber, selectedCountry.cca2)}
            />
          </View>
        )}

        <TouchableOpacity style={styles.optionButton} onPress={handleShareLink}>
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
          onPress={() => navigation.navigate('CreatePayment')}
        />
      </View>
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalContent.title}
        subtitle={modalContent.subtitle}
        type={modalContent.type}
      />
      <CountryModal
        visible={countryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        onSelectCountry={() => {}}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
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
    marginBottom: 12,
  },
  optionButton: {
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
  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  countryCodeText: {
    marginLeft: 10,
    marginRight: 6,
    fontSize: 14,
    color: '#002859',
    fontFamily: 'Mulish-Regular',
  },
  numberInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    color: '#002859',
    paddingLeft: 5,
    fontFamily: 'Mulish-Regular',
  },
});
