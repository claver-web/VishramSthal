'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PaymentButtonProps {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  userId: string;
  disabled?: boolean;
}

export default function PaymentButton({ roomId, checkIn, checkOut, guests, totalPrice, userId, disabled }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error('Failed to load Razorpay. Please check your connection.');
        setLoading(false);
        return;
      }

      // Step 1: Create Order
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, checkIn, checkOut, guests, userId }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order');

      // Step 2: Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC for client side
        amount: orderData.amount,
        currency: 'INR',
        name: 'Vishram Sthal',
        description: 'Luxury Room Booking',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            toast.loading('Verifying payment...', { id: 'verify-toast' });
            
            // Step 3: Verify Payment
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: orderData.bookingId,
                roomId: roomId,
              }),
            });
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok && verifyData.success) {
              toast.success('Payment successful! Your booking is confirmed.', { id: 'verify-toast' });
              router.push('/bookings'); // We will build this page later
            } else {
              toast.error(verifyData.error || 'Payment verification failed', { id: 'verify-toast' });
            }
          } catch (err) {
            toast.error('Payment verification failed', { id: 'verify-toast' });
          }
        },
        prefill: {
          name: 'Guest User',
          email: 'guest@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#f97316', // tailwind orange-500
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        toast.error(response.error.description || 'Payment failed');
      });
      paymentObject.open();

    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading}
      className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl transition-all shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3"
    >
      {loading ? (
        <>
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </>
      ) : (
        'Pay with Razorpay'
      )}
    </button>
  );
}
