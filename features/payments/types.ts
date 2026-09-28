export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
