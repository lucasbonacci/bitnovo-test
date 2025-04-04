export type PaymentSocketEvent = {
  identifier: string;
  reference: string | null;
  created_at: string;
  edited_at: string;
  status: 'NC' | 'AC' | 'CO' | 'IA' | string;
  fiat_amount: number;
  crypto_amount: number;
  unconfirmed_amount: number;
  confirmed_amount: number;
  currency_id: string;
  address: string;
  fiat: string;
  merchant_device: string;
  merchant_device_id: number;
  received_amount: number;
  good_fee: boolean;
  balance_based: string | boolean;
  safe: boolean;
  percentage: number;
  rbf: boolean;
  internal_data: any;
  language: string;
  notes: string;
  tag_memo: string;
  url_ok: string | null;
  url_ko: string | null;
  url_standby: string | null;
  expired_time: string;
  transactions?: any[];
};
