'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookingSummary from './BookingSummary';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function BookingFlow({ room }: { room: any }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [processingMethod, setProcessingMethod] = useState<'CASH' | 'RAZORPAY' | null>(null);

  // Pre-fill from Clerk user
  useEffect(() => {
    if (isLoaded && user) {
      setFullName(user.fullName || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
      if (user.primaryPhoneNumber?.phoneNumber) {
        setPhone(user.primaryPhoneNumber.phoneNumber);
      }
    }
  }, [isLoaded, user]);

  const hasValidDates = checkIn && checkOut && new Date(checkIn) < new Date(checkOut);
  const isFormComplete = hasValidDates && fullName.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && guests > 0 && agreedToTerms;

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

  const handleBooking = async (paymentMethod: 'CASH' | 'RAZORPAY') => {
    if (!isFormComplete || processingMethod) return;
    setProcessingMethod(paymentMethod);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          userId: user?.id,
          guestName: fullName,
          guestEmail: email,
          guestPhone: phone,
          checkIn,
          checkOut,
          guests,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const booking = data.booking;
        const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          });
        };
        const queryParams = new URLSearchParams({
          paymentMethod,
          roomName: booking.room.name || booking.room.spiritualName || `Room ${booking.room.number}`,
          checkIn: formatDate(booking.checkIn),
          checkOut: formatDate(booking.checkOut),
          guests: booking.guests.toString(),
          totalPrice: `₹${booking.totalPrice.toLocaleString('en-IN')}`
        });
        router.push(`/booking/success?${queryParams.toString()}`);
      } else {
        alert('Booking failed: ' + data.error);
        setProcessingMethod(null);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during booking. Please try again.');
      setProcessingMethod(null);
    }
  };

  const inputClass = "w-full bg-neutral-950 border border-neutral-800 text-neutral-200 p-3 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side — Single Form */}
      <div className="lg:col-span-2">
        <section className="p-6 md:p-8 rounded-3xl border border-neutral-800 bg-neutral-900 shadow-xl space-y-8">

          {/* Dates */}
          <div>
            <h2 className="text-xl text-white font-serif mb-4 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-sm font-bold">1</span>
              Select Your Dates
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-neutral-400 mb-1.5">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-neutral-400 mb-1.5">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800" />

          {/* Guest Info — inline fields */}
          <div>
            <h2 className="text-xl text-white font-serif mb-4 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-sm font-bold">2</span>
              Your Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-neutral-400 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1.5">Email <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99999 99999"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-neutral-400 mb-1.5">Number of Guests <span className="text-red-400">*</span></label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={`${inputClass} appearance-none`}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800" />

          {/* Booking Buttons */}
          <div>
            <h2 className="text-xl text-white font-serif mb-4 flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${isFormComplete ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-700 text-neutral-400'}`}>3</span>
              Confirm Booking
            </h2>

            {/* Terms & Conditions Checkbox */}
            <div className="mb-6 flex items-start gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-neutral-700 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs sm:text-sm text-neutral-300 cursor-pointer leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" target="_blank" className="text-amber-500 hover:text-amber-400 underline font-medium">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/cancellation" target="_blank" className="text-amber-500 hover:text-amber-400 underline font-medium">
                  Cancellation Policy
                </Link>.
              </label>
            </div>

            {!isFormComplete && (
              <p className="text-neutral-500 text-sm mb-4">
                {!agreedToTerms && hasValidDates && fullName.trim() !== '' && email.trim() !== ''
                  ? 'Please check the box above to accept the Terms & Conditions.'
                  : 'Please fill in all required fields above to proceed.'}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleBooking('RAZORPAY')}
                disabled={!isFormComplete || !!processingMethod}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 border border-blue-500/30 shadow-lg shadow-blue-900/20"
              >
                {processingMethod === 'RAZORPAY' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  '💳 Pay Now'
                )}
              </button>

              <button
                onClick={() => handleBooking('CASH')}
                disabled={!isFormComplete || !!processingMethod}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-amber-900/20"
              >
                {processingMethod === 'CASH' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Reservation...
                  </span>
                ) : (
                  '🏨 Pay at Check-in'
                )}
              </button>
            </div>
          </div>

        </section>
      </div>

      {/* Right Side — Summary */}
      <div className="lg:col-span-1">
        <BookingSummary room={room} checkIn={checkIn} checkOut={checkOut} />
      </div>
    </div>
  );
}
