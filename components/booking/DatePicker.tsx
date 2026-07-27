'use client';
import React, { useState } from 'react';

export default function DatePicker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  return (
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
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 p-3 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all [color-scheme:dark]"
        />
      </div>
    </div>
  );
}
