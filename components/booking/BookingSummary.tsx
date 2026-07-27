'use client';
import React from 'react';

export default function BookingSummary({ roomId }: { roomId: string }) {
  // Placeholder values, ideally these come from state/context or props based on DatePicker
  const nights = 2;
  const pricePerNight = 15000;
  const subtotal = nights * pricePerNight;
  const gst = subtotal * 0.12;
  const total = subtotal + gst;

  return (
    <div className="sticky top-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
      <div className="aspect-video bg-neutral-800 rounded-xl mb-6 overflow-hidden">
        {/* Placeholder image */}
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">
          Room Image
        </div>
      </div>
      <h3 className="text-xl font-serif text-amber-400 mb-4">Divine Suite {roomId}</h3>
      
      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-400">Check-in</span>
          <span>--</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Check-out</span>
          <span>--</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Guests</span>
          <span>2 Adults</span>
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-4 space-y-3 mb-6">
        <div className="flex justify-between text-neutral-300">
          <span>₹{pricePerNight.toLocaleString()} x {nights} nights</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-neutral-400 text-sm">
          <span>Taxes (12% GST)</span>
          <span>₹{gst.toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-4 mb-6">
        <div className="flex justify-between items-end">
          <span className="text-lg">Total</span>
          <span className="text-2xl text-amber-500 font-medium">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <button className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-medium transition-colors shadow-lg shadow-amber-900/20">
        Proceed to Book
      </button>
    </div>
  );
}
