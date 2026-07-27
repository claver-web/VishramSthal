import React from 'react';
import DatePicker from '@/components/booking/DatePicker';
import BookingSummary from '@/components/booking/BookingSummary';

export default function BookingPage({ params }: { params: { roomId: string } }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-amber-500 mb-8">Book Your Retreat</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <h2 className="text-2xl text-amber-400 mb-4 font-serif">Select Dates</h2>
              <DatePicker />
            </section>
          </div>
          <div>
            <BookingSummary roomId={params.roomId} />
          </div>
        </div>
      </div>
    </div>
  );
}
