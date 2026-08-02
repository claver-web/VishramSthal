'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Printer, Phone, Mail, MapPin } from 'lucide-react';

export default function CancellationPolicyPage() {
  const lastUpdated = "August 2, 2026";

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-amber-500 text-sm mb-3">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight size={14} className="text-neutral-600" />
            <span className="text-white font-medium">Cancellation Policy</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Cancellation & Refund Policy</h1>
              <p className="text-neutral-400 mt-2">Last Updated: {lastUpdated}</p>
            </div>
            <button
              onClick={handlePrint}
              className="print:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-sm font-medium transition-all cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-4 h-4 text-amber-500" />
              <span>Print Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10 text-neutral-300 leading-relaxed">
          
          <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl">
            <p className="text-base text-neutral-200">
              At <strong className="text-amber-500">Vishram Sthal</strong>, we understand that travel plans can change. We strive to provide transparent, guest-friendly cancellation policies for all reservations made directly through our website or front desk.
            </p>
          </div>

          {/* Section 1: Online Payment Bookings */}
          <section className="border-b border-neutral-800 pb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Online Payment Bookings (Prepaid)</h2>
            <p className="mb-4">For reservations paid online via Razorpay (UPI, Credit/Debit Cards, Net Banking):</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-neutral-900 border border-emerald-500/40 p-5 rounded-2xl text-center">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-full mb-2">100% Refund</span>
                <h3 className="text-white font-bold text-lg mb-1">Free Cancellation</h3>
                <p className="text-xs text-neutral-400">Cancel up to <strong className="text-white">48 hours</strong> before check-in time (2:00 PM).</p>
              </div>

              <div className="bg-neutral-900 border border-amber-500/40 p-5 rounded-2xl text-center">
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase rounded-full mb-2">50% Refund</span>
                <h3 className="text-white font-bold text-lg mb-1">Partial Refund</h3>
                <p className="text-xs text-neutral-400">Cancel between <strong className="text-white">24 to 48 hours</strong> before check-in time.</p>
              </div>

              <div className="bg-neutral-900 border border-red-500/40 p-5 rounded-2xl text-center">
                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase rounded-full mb-2">No Refund</span>
                <h3 className="text-white font-bold text-lg mb-1">Late Cancellation</h3>
                <p className="text-xs text-neutral-400">Cancel <strong className="text-white">less than 24 hours</strong> before check-in or No-Show.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Cash on Arrival Bookings */}
          <section className="border-b border-neutral-800 pb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Cash on Arrival Bookings</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li><strong className="text-amber-500">Free Cancellation:</strong> You may cancel provisional cash bookings at any time before the check-in date without penalty.</li>
              <li><strong className="text-amber-500">Provisional Holding Window:</strong> Rooms reserved under Cash on Arrival are held provisionally until <strong className="text-white">1:00 PM</strong> on the scheduled check-in date.</li>
              <li><strong className="text-amber-500">No-Show Rule:</strong> If you fail to arrive or confirm your booking by 1:00 PM on check-in day, the reservation automatically cancels with zero charges.</li>
            </ul>
          </section>

          {/* Section 3: Refund Processing */}
          <section className="border-b border-neutral-800 pb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Refund Processing & Timelines</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Approved refunds for prepaid bookings will be processed within <strong className="text-white">7 to 10 business days</strong>.</li>
              <li>Refund amounts will be credited back to the original bank account, card, or UPI ID used during online checkout.</li>
              <li>Payment gateway processing fees charged by Razorpay (if any) are non-refundable.</li>
            </ul>
          </section>

          {/* Section 4: Cancellation by Hotel */}
          <section className="border-b border-neutral-800 pb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Cancellation by Vishram Sthal</h2>
            <p className="mb-3">In rare and unforeseen circumstances (such as extreme weather, natural events, or unexpected property maintenance):</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Vishram Sthal reserves the right to cancel a reservation.</li>
              <li>Guests will receive a <strong className="text-emerald-400">100% immediate full refund</strong>.</li>
              <li>We will notify affected guests promptly via phone call, SMS, and email.</li>
            </ul>
          </section>

          {/* Section 5: Date Modifications */}
          <section className="border-b border-neutral-800 pb-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Date Modifications</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Guests may request date changes at least <strong className="text-white">48 hours</strong> prior to original check-in.</li>
              <li>Date modifications are subject to room availability and potential seasonal room rate adjustments.</li>
              <li>No modification administrative fee is charged; guests pay only the rate differential (if applicable).</li>
            </ul>
          </section>

          {/* Section 6: How to Request Cancellation */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. How to Cancel Your Booking</h2>
            <p className="mb-6 text-neutral-300">To cancel or modify your reservation, please reach out to our front desk team with your booking reference ID:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-white">Call Us</h4>
                  <p className="text-sm text-amber-500 mt-1 font-semibold">+91 9815271636<br />+91 8988478367</p>
                </div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-white">Email Us</h4>
                  <p className="text-sm text-amber-500 mt-1 font-semibold">reservations@vishramsthal.com</p>
                </div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-white">Location</h4>
                  <p className="text-xs text-neutral-300 mt-1">Vishram Sthal, Word No. 6, Dehra Gopipur, HP</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
