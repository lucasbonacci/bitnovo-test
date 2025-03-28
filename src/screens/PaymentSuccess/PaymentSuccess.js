import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SVG} from '@/assets/svg/index';
import {Button} from '@/components';
import LottieView from 'lottie-react-native';

const PaymentSuccess = ({onFinish}) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    lottieRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        source={require('@/assets/lottie/confetti.json')}
        autoPlay={false}
        loop={true}
        style={styles.lottie}
      />

      <View style={styles.checkIcon}>
        <SVG.GreenCheck />
        <Text style={styles.title}>Pago recibido</Text>
        <Text style={styles.subtitle}>El pago se ha confirmado con éxito</Text>
      </View>

      <View style={styles.button}>
        <Button label="Finalizar" variant="secondary" onPress={onFinish} />
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  checkIcon: {
    marginTop: 140,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Mulish-Regular',
    color: '#647184',
    paddingTop: 10,
  },
  lottie: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: 100,
    zIndex: 1,
  },
  button: {
    marginHorizontal: 16,
  },
});
