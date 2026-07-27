'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar, Users, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('paymentMethod') || 'ONLINE';
  const isCash = paymentMethod === 'CASH';

  const bookingDetails = {
    roomName: searchParams.get('roomName') || 'Deluxe Suite',
    checkIn: searchParams.get('checkIn') || 'Oct 24, 2026',
    checkOut: searchParams.get('checkOut') || 'Oct 26, 2026',
    guests: searchParams.get('guests') || '2',
    totalPrice: searchParams.get('totalPrice') || '₹12,500',
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* Top Glow */}
        <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 ${isCash ? 'bg-amber-500' : 'bg-emerald-500'}`} />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
            className={`p-4 rounded-full mb-6 ${isCash ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}
          >
            {isCash ? <Clock size={48} strokeWidth={1.5} /> : <CheckCircle2 size={48} strokeWidth={1.5} />}
          </motion.div>

          <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${isCash ? 'text-amber-500' : 'text-emerald-500'}`}>
            {isCash ? 'Booking Reserved!' : 'Booking Confirmed!'}
          </h1>
          
          <p className="text-neutral-400 mb-8 max-w-md">
            {isCash 
              ? 'Your room has been reserved. Please ensure you arrive before 1:00 PM to pay in cash and retain your booking.'
              : 'Thank you for your payment. Your booking has been successfully confirmed. A receipt has been sent to your email.'}
          </p>

          <div className="w-full bg-neutral-950/50 rounded-2xl border border-neutral-800 p-6 mb-8 text-left">
            <h3 className="text-xl font-semibold text-neutral-100 mb-6 border-b border-neutral-800 pb-4">Reservation Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-900 text-amber-500">
                  <Home size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Room</p>
                  <p className="font-medium text-neutral-200">{bookingDetails.roomName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-900 text-amber-500">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Dates</p>
                  <p className="font-medium text-neutral-200">{bookingDetails.checkIn} - {bookingDetails.checkOut}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-900 text-amber-500">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Guests</p>
                  <p className="font-medium text-neutral-200">{bookingDetails.guests} Guests</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-900 text-amber-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Amount</p>
                  <p className="font-medium text-neutral-200">{bookingDetails.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {isCash && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 text-amber-400 text-sm flex items-start gap-3 text-left"
            >
              <Clock className="shrink-0 mt-0.5" size={18} />
              <p>
                <strong>Important:</strong> Cash reservations are held until 1:00 PM on the day of check-in. If you do not arrive by this time, your reservation may be cancelled automatically.
              </p>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/bookings" className="flex-1">
              <button className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors border border-neutral-700 hover:border-neutral-600 flex items-center justify-center gap-2">
                View My Bookings
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2">
                Return Home <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
