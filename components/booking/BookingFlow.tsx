'use client';
import React, { useState } from 'react';
import DatePicker from './DatePicker';
import GuestForm from './GuestForm';
import BookingSummary from './BookingSummary';
import { useUser, SignInButton } from '@clerk/nextjs';
import { differenceInDays, parseISO } from 'date-fns';

export default function BookingFlow({ room }: { room: any }) {
  const { isSignedIn, isLoaded } = useUser();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // To avoid calculating nights if dates are invalid
  const hasValidDates = checkIn && checkOut && new Date(checkIn) < new Date(checkOut);
  
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
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${hasValidDates ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-700 text-neutral-400'}`}>2</span>
            <h2 className="text-2xl text-white font-serif">Guest Details</h2>
          </div>
          
          {!hasValidDates ? (
            <p className="text-neutral-500">Please select valid dates first to proceed.</p>
          ) : (
            <GuestForm onSubmit={(data) => console.log('Proceed to payment', data)} />
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
