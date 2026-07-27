"use client";

import { Lock } from "lucide-react";

interface RazorpayPaymentProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
  isProcessing: boolean;
}

export default function RazorpayPayment({ amount, onSuccess, onError, isProcessing }: RazorpayPaymentProps) {
  return (
    <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center shadow-xl">
      <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <Lock className="w-8 h-8 text-amber-500" />
      </div>
      
      <h3 className="text-xl font-serif text-neutral-100 mb-2">Secure Online Payment</h3>
      <p className="text-neutral-400 mb-8 max-w-md mx-auto">
        Complete your booking securely via Razorpay. Your transaction is encrypted and safe.
      </p>
      
      <div className="bg-neutral-950 rounded-xl p-6 mb-8 max-w-sm mx-auto border border-neutral-800 flex justify-between items-center">
        <span className="text-neutral-400">Total Amount</span>
        <span className="text-2xl font-medium text-amber-500">₹{amount.toLocaleString('en-IN')}</span>
      </div>

      <button
        disabled={isProcessing}
        className="w-full max-w-sm mx-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          `Pay ₹${amount.toLocaleString('en-IN')} Now`
        )}
      </button>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
        <span>Powered by</span>
        <span className="font-semibold text-neutral-400 tracking-wide">RAZORPAY</span>
      </div>
    </div>
  );
}
