import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';

export type RootStackParamList = {
  [Paths.CreatePayment]: undefined;
  [Paths.PaymentRequest]: undefined;  
  [Paths.PaymentSuccess]: undefined;
  [Paths.QRCodePayment]: undefined;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
