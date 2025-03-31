import React, {FC} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {SVG} from '@/assets/svg';
import {Button} from '@/components';

const {width} = Dimensions.get('window');

interface StatusModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  type: 'success' | 'loading' | 'warning'| 'error' | string;
}

const StatusModal: FC<StatusModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  type = 'loading',
}) => {

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <SVG.LightBlueCheck />;
      case 'loading':
        return <ActivityIndicator size="large" color="#002859" />;
      case 'warning':
        return <SVG.WarningIcon />;
      case 'error':
        return <SVG.ErrorIcon />;
      default:
        return <SVG.LightBlueCheck />;
    }
  }


  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.wrapper}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.overlay} />
        <View style={styles.modalCard}>
          <View style={styles.iconCircle}>
            {getIcon()}
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{subtitle}</Text>

          <Button
            label="Entendido"
            variant="primary"
            onPress={onClose}
            loading={false}
            disabled={false}
            icon={null}
          />
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalCard: {
    width: width * 0.97,
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
    borderRadius: 24,
    zIndex: 2,
  },
  iconCircle: {
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Mulish-Bold',
    color: '#002859',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontFamily: 'Mulish-Regular',
    color: '#647184',
    textAlign: 'center',
    marginBottom: 24,
  },
});
