import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {SVG} from '@/assets/svg/index';
import {usePaymentSocket} from '@/hooks/usePaymentSocket';
import {SuccessModal} from '@/components';

const QRCodePayment = ({route}) => {
  const {identifier, amount, paymentLink} = route.params;
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

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <SVG.InfoCircle />
        <Text style={styles.bannerText}>
          Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay.
        </Text>
      </View>

      <View style={styles.qrContainer}>
        <QRCode
          value={paymentLink}
          size={350}
          logoSize={30}
          logoBackgroundColor="white"
        />

        <View style={styles.logo}>
          <SVG.LogoQr />
        </View>
      </View>

      <Text style={styles.amountText}>{amount}</Text>

      <Text style={styles.updateText}>
        Esta pantalla se actualizará automáticamente.
      </Text>
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalContent.title}
        subtitle={modalContent.subtitle}
        type={modalContent.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035AC5',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  banner: {
    backgroundColor: '#EAF3FF',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 20,
    flexDirection: 'row',
  },
  bannerText: {
    color: '#002859',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Mulish-Regular',
    textAlign: 'left',
    marginLeft: 10,
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 6,
    marginBottom: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
  },
  amountText: {
    fontSize: 26,
    fontFamily: 'Mulish-Bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  updateText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Mulish-Regular',
    color: '#FFFFFF',
  },
});

export default QRCodePayment;
