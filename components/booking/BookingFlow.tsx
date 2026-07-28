'use client';
import React, { useState } from 'react';
import GuestForm from './GuestForm';
import BookingSummary from './BookingSummary';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function BookingFlow({ room }: { room: any }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [step, setStep] = useState(1);
  const [guestData, setGuestData] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  
  // To avoid calculating nights if dates are invalid
  const hasValidDates = checkIn && checkOut && new Date(checkIn) < new Date(checkOut);
  
  if (!hasValidDates && step > 1) {
    setStep(1);
  }
  
  if (!isLoaded) {
    return <div className="text-amber-500 p-8 text-center animate-pulse">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🔒</span>
        </div>
        <h2 className="text-2xl font-serif text-white mb-4">You need to login first to book your room</h2>
        <p className="text-neutral-400 mb-8 max-w-md">Please sign in or create an account to proceed with your divine reservation.</p>
        <SignInButton mode="modal">
          <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:scale-105">
            Sign In to Continue
          </button>
        </SignInButton>
      </div>
    );
  }

  const handleGuestSubmit = (data: any) => {
    setGuestData(data);
    setStep(3);
  };

  const handleBooking = async (paymentMethod: 'CASH' | 'RAZORPAY') => {
    setIsBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          userId: user?.id,
          checkIn,
          checkOut,
          guests: guestData?.guests || 1,
          paymentMethod,
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        // Assuming there is a success page. If not, redirect to /rooms for now.
        router.push('/booking/success');
      } else {
        alert('Booking failed: ' + data.error);
        setIsBooking(false);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during booking. Please try again.');
      setIsBooking(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Step 1: Dates */}
        <section className={`p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-colors ${hasValidDates ? 'bg-neutral-900 border-neutral-800' : 'bg-[#1a1a2e] border-amber-500/50'}`}>
          <div className={`absolute top-0 left-0 w-2 h-full ${hasValidDates ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${hasValidDates ? 'bg-green-500 text-neutral-950' : 'bg-amber-500 text-neutral-950'}`}>
                {hasValidDates ? '✓' : '1'}
              </span>
              <h2 className="text-2xl text-white font-serif">Select Your Dates</h2>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-neutral-400 mb-2">Check-in Date</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 p-3 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all [color-scheme:dark]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-neutral-400 mb-2">Check-out Date</label>
              <input 
                type="date" 
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 p-3 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all [color-scheme:dark]"
              />
            </div>
          </div>
        </section>

        {/* Step 2: Guest Details */}
        <section className={`p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-500 ${hasValidDates ? 'bg-neutral-900 border-neutral-800 opacity-100' : 'bg-neutral-900 border-neutral-800 opacity-50 pointer-events-none'}`}>
          <div className="absolute top-0 left-0 w-2 h-full bg-neutral-700"></div>
          <div className="flex items-center gap-4 mb-6">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${(hasValidDates && step < 3) ? 'bg-amber-500 text-neutral-950' : step === 3 ? 'bg-green-500 text-neutral-950' : 'bg-neutral-700 text-neutral-400'}`}>
              {step === 3 ? '✓' : '2'}
            </span>
            <h2 className="text-2xl text-white font-serif">Guest Details</h2>
          </div>
          
          {!hasValidDates ? (
            <p className="text-neutral-500">Please select valid dates first to proceed.</p>
          ) : step === 3 ? (
            <div className="text-green-400 flex items-center gap-2 font-bold bg-green-500/10 p-4 rounded-xl border border-green-500/20">
              <span>✓</span> Guest Details Confirmed 
              <button onClick={() => setStep(2)} className="text-amber-500 text-sm ml-auto hover:underline font-normal">Edit Details</button>
            </div>
          ) : (
            <GuestForm onSubmit={handleGuestSubmit} defaultValues={guestData} />
          )}
        </section>

        {/* Step 3: Payment Options */}
        <section className={`p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-500 ${step === 3 ? 'bg-neutral-900 border-amber-500/30 opacity-100 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'bg-neutral-900 border-neutral-800 opacity-50 pointer-events-none hidden md:block'}`}>
          <div className={`absolute top-0 left-0 w-2 h-full ${step === 3 ? 'bg-amber-500' : 'bg-neutral-700'}`}></div>
          <div className="flex items-center gap-4 mb-6">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${step === 3 ? 'bg-amber-500 text-neutral-950 animate-pulse' : 'bg-neutral-700 text-neutral-400'}`}>3</span>
            <h2 className="text-2xl text-white font-serif">Secure Payment</h2>
          </div>
          
          {step === 3 ? (
            <div className="space-y-4">
              <p className="text-neutral-400 mb-6">Select your preferred divine payment method to confirm your reservation.</p>
              
              <button 
                onClick={() => handleBooking('RAZORPAY')}
                disabled={isBooking}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-50 border border-blue-500/30 shadow-lg shadow-blue-900/20"
              >
                {isBooking ? 'Processing...' : '💳 Pay Now (Razorpay)'}
              </button>
              
              <button 
                onClick={() => handleBooking('CASH')}
                disabled={isBooking}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-50 shadow-lg shadow-amber-900/20"
              >
                {isBooking ? 'Processing...' : '🏨 Pay at Check-in'}
              </button>
            </div>
          ) : (
            <p className="text-neutral-500">Complete guest details to view payment options.</p>
          )}
        </section>
      </div>

      {/* Right Side (40%) */}
      <div className="lg:col-span-1">
        <BookingSummary room={room} checkIn={checkIn} checkOut={checkOut} />
      </div>
    </div>
  );
}
