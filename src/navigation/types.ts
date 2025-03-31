import type {StackScreenProps} from '@react-navigation/stack';
import type {Paths} from '@/navigation/paths';

export interface PaymentRequestData {
  amount: number;
  prefix: string;
  suffix: string;
  fiat: string;
  web_url: string;
  identifier: string;
}
export interface PaymentRequestParams {
  data: PaymentRequestData;
}

export type QRCodePaymentParams = {
  fullUrl: string;
  amount: string;
  identifier: string;
};

export type RootStackParamList = {
  [Paths.CreatePayment]: undefined;
  [Paths.PaymentRequest]: PaymentRequestParams;
  [Paths.PaymentSuccess]: undefined;
  [Paths.QRCodePayment]: QRCodePaymentParams;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
