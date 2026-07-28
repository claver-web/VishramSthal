'use client';
import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Info, Phone, Mail, ShieldCheck } from 'lucide-react';
import { differenceInDays } from 'date-fns';

export default function BookingSummary({ room, checkIn, checkOut }: { room: any, checkIn?: string, checkOut?: string }) {
  // Mock calculation logic
  let nights = 1;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end > start) {
      nights = differenceInDays(end, start);
    }
  }

  const pricePerNight = room?.price || 4000;
  const roomCharges = nights * pricePerNight;
  const extraGuestCharges = 500;
  const longStayDiscount = roomCharges * 0.10;
  const subtotal = roomCharges + extraGuestCharges - longStayDiscount;
  const gst = subtotal * 0.12;
  const serviceCharge = 200;
  const total = subtotal + gst + serviceCharge;

  const displayImage = room?.images?.[0] || 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800';

  return (
    <div className="sticky top-24 bg-[#1a1a2e] border-2 border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-black">
      
      {/* Room Preview */}
      <div className="relative h-48 w-full bg-neutral-800">
        <Image src={displayImage} alt="Room" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/20 px-2 py-1 rounded backdrop-blur-sm border border-amber-500/30 mb-2 inline-block">
                {room?.type || 'SUITE'}
              </span>
              <h3 className="text-2xl font-serif text-white leading-tight shadow-black drop-shadow-md">
                {room?.name || `Room ${room?.number}`}
              </h3>
            </div>
            <div className="flex gap-0.5 drop-shadow-md">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Stay Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 border-b border-neutral-800 pb-6">
          <div>
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Check-in</p>
            <p className="text-sm text-white font-medium">Mon, 15 Jan 2024</p>
            <p className="text-xs text-neutral-400">From 2:00 PM</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Check-out</p>
            <p className="text-sm text-white font-medium">Thu, 18 Jan 2024</p>
            <p className="text-xs text-neutral-400">Until 11:00 AM</p>
          </div>
          <div className="col-span-2 bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex justify-between items-center mt-2">
            <div>
              <p className="text-xs text-neutral-500 font-bold uppercase">Stay Duration</p>
              <p className="text-sm text-white font-medium">{nights} Nights</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500 font-bold uppercase">Guests</p>
              <p className="text-sm text-white font-medium">2 Adults, 1 Child</p>
            </div>
          </div>
        </div>

        {/* Detailed Price Breakdown */}
        <div className="space-y-3 mb-6 text-sm border-b border-neutral-800 pb-6 font-medium">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">Price Breakdown</h4>
          
          <div className="flex justify-between text-neutral-300">
            <span>Room ({nights} nights × ₹{pricePerNight})</span>
            <span>₹{roomCharges.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-neutral-300">
            <span>Extra Guest (1 Child)</span>
            <span>₹{extraGuestCharges.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-green-400">
            <span>Long Stay Discount (10%)</span>
            <span>-₹{longStayDiscount.toLocaleString()}</span>
          </div>
          
          <div className="border-t border-neutral-800 border-dashed pt-3 mt-3 flex justify-between text-neutral-300">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-neutral-400 text-xs">
            <span>Taxes & GST (12%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-neutral-400 text-xs">
            <span>Service Charge</span>
            <span>₹{serviceCharge.toLocaleString()}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="block text-sm text-neutral-400 font-bold">Total Amount</span>
            <span className="block text-xs text-neutral-500">Includes all taxes</span>
          </div>
          <span className="text-3xl font-black text-amber-500">₹{total.toLocaleString()}</span>
        </div>

        {/* Payment Summary */}
        <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 mb-6">
          <p className="text-sm text-white flex justify-between mb-1">
            <span>Amount to pay now:</span>
            <span className="font-bold text-amber-500">₹{total.toLocaleString()}</span>
          </p>
          <p className="text-xs text-neutral-400 flex justify-between">
            <span>Due at property:</span>
            <span>₹0</span>
          </p>
        </div>

        {/* Cancellation Info */}
        <div className="mb-6 space-y-2">
          <div className="flex gap-2 items-start text-xs text-neutral-300">
            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
            <p><b>Free cancellation</b> until 13 Jan 2024 (48hrs before check-in).</p>
          </div>
          <div className="flex gap-2 items-start text-xs text-neutral-300">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <p>50% refund until 14 Jan 2024.</p>
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="bg-gradient-to-b from-amber-500/10 to-transparent p-4 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-500">Price Guarantee</span>
          </div>
          <ul className="text-xs text-neutral-400 space-y-1">
            <li className="flex gap-2">✓ Best price guaranteed</li>
            <li className="flex gap-2">✓ No hidden charges</li>
            <li className="flex gap-2">✓ 100% Secure Payment</li>
          </ul>
        </div>

        {/* Need Help */}
        <div className="text-center pt-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-500 mb-2">Need help with your booking?</p>
          <div className="flex justify-center gap-4 text-sm font-medium text-neutral-300">
            <a href="#" className="flex items-center gap-1 hover:text-amber-500 transition-colors"><Phone className="w-4 h-4" /> Call</a>
            <a href="#" className="flex items-center gap-1 hover:text-green-500 transition-colors"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );
}
