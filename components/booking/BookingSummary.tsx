'use client';
import React from 'react';
import Image from 'next/image';
import { Calendar, Moon, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { differenceInDays, format, parseISO } from 'date-fns';

export default function BookingSummary({ room, checkIn, checkOut }: { room: any; checkIn?: string; checkOut?: string }) {
  const hasValidDates = checkIn && checkOut && new Date(checkIn) < new Date(checkOut);

  let nights = 0;
  let checkInDate: Date | null = null;
  let checkOutDate: Date | null = null;

  if (hasValidDates) {
    checkInDate = parseISO(checkIn);
    checkOutDate = parseISO(checkOut);
    nights = differenceInDays(checkOutDate, checkInDate);
  }

  const pricePerNight = room?.price || 0;
  const roomCharges = nights * pricePerNight;
  const gst = Math.round(roomCharges * 0.12);
  const total = roomCharges + gst;

  const displayImage = room?.images?.[0] || '/placeholder-room.jpg';

  return (
    <div className="sticky top-24 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">

      {/* Room Image + Name */}
      <div className="relative h-44 w-full bg-neutral-800">
        <Image src={displayImage} alt={room?.name || 'Room'} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/20 inline-block mb-1">
            {room?.type || 'Room'}
          </span>
          <h3 className="text-lg font-serif text-white leading-snug">
            {room?.name || `Room ${room?.number}`}
          </h3>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Dates & Nights */}
        {hasValidDates ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex-1 flex justify-between text-sm">
                <div>
                  <p className="text-neutral-500 text-xs mb-0.5">Check-in</p>
                  <p className="text-white font-medium">{format(checkInDate!, 'dd MMM yyyy')}</p>
                </div>
                <div className="text-right">
                  <p className="text-neutral-500 text-xs mb-0.5">Check-out</p>
                  <p className="text-white font-medium">{format(checkOutDate!, 'dd MMM yyyy')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-sm text-white font-medium">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-neutral-500 text-sm border border-dashed border-neutral-800 rounded-xl">
            Select dates to see pricing
          </div>
        )}

        {/* Price Breakdown — only show when dates are valid */}
        {hasValidDates && (
          <>
            <div className="border-t border-neutral-800" />

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-neutral-300">
                <span>₹{pricePerNight.toLocaleString('en-IN')} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span>₹{roomCharges.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-xs">
                <span>GST (12%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className="border-t border-neutral-800 pt-3 mt-1 flex justify-between items-center">
                <span className="text-white font-bold">Total</span>
                <span className="text-2xl font-black text-amber-500">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </>
        )}

        {/* Trust badges */}
        <div className="border-t border-neutral-800 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold text-green-400">Secure Booking</span>
          </div>
          <ul className="text-[11px] text-neutral-500 space-y-1 pl-6">
            <li>✓ No hidden charges</li>
            <li>✓ Free cancellation (48hrs prior)</li>
            <li>✓ Instant confirmation</li>
          </ul>
        </div>

        {/* Help */}
        <div className="text-center pt-3 border-t border-neutral-800">
          <p className="text-[11px] text-neutral-500 mb-1">Need help?</p>
          <a href="tel:+919815271636" className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-amber-500 transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call Us
          </a>
          <span className="text-neutral-600 mx-1">|</span>
          <a href="https://wa.me/918988478367" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-green-500 transition-colors">
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

