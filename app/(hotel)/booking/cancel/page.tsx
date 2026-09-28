'use client';

import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BookingCancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* Top Glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-10" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.1 }}
            className="p-4 rounded-full bg-red-500/10 text-red-500 mb-6"
          >
            <XCircle size={56} strokeWidth={1.5} />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-neutral-100">
            Payment Failed
          </h1>
          
          <p className="text-neutral-400 mb-8">
            We couldn't process your payment. Your booking has not been confirmed. 
            No charges were made to your account.
          </p>

          <div className="flex flex-col gap-4 w-full">
            <button 
              onClick={() => router.back()}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} /> Try Payment Again
            </button>
            
            <Link href={roomId ? `/rooms/${roomId}` : "/rooms"} className="w-full">
              <button className="w-full py-3.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors border border-neutral-700 hover:border-neutral-600 flex items-center justify-center gap-2">
                <ArrowLeft size={18} /> Return to Room Details
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
