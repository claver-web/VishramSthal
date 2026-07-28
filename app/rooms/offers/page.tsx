import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { Clock, Percent, Tag, ArrowRight } from 'lucide-react';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  const rooms = await prisma.room.findMany({
    take: 6,
    where: { isAvailable: true }
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">Special Promotions</span>
          <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 mb-6 drop-shadow-md">
            Divine Offers & Packages
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Elevate your spiritual journey with our exclusive seasonal packages and extended stay benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => {
            // Mock dynamic offer data based on index
            const discountPercent = idx % 2 === 0 ? 15 : 10;
            const originalPrice = room.price + (room.price * (discountPercent / 100));
            const validityDate = new Date();
            validityDate.setDate(validityDate.getDate() + 14);

            return (
              <div key={room.id} className="bg-[#1a1a2e] rounded-3xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-colors shadow-2xl group relative flex flex-col">
                <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                  <Percent className="w-3 h-3" /> {discountPercent}% OFF
                </div>
                
                <div className="relative h-60 w-full overflow-hidden">
                  <Image 
                    src={room.images[0] || 'https://images.unsplash.com/photo-1590490359683-658d3d23f972'} 
                    alt={room.name || 'Room'} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-serif text-amber-400 shadow-black drop-shadow-md">{room.name || `Room ${room.number}`}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-lg text-white font-medium mb-3">The {idx % 2 === 0 ? 'Spiritual Retreat' : 'Long Stay'} Package</h4>
                  <ul className="space-y-2 mb-6 text-sm text-neutral-400 flex-1">
                    <li className="flex items-center gap-2"><Tag className="w-4 h-4 text-amber-500" /> Complimentary Morning Aarti</li>
                    <li className="flex items-center gap-2"><Tag className="w-4 h-4 text-amber-500" /> Free Breakfast Included</li>
                    <li className="flex items-center gap-2"><Tag className="w-4 h-4 text-amber-500" /> Flexible Check-out</li>
                  </ul>
                  
                  <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 mb-6">
                    <div className="flex items-end gap-3 mb-2">
                      <span className="text-3xl font-black text-white">₹{room.price}</span>
                      <span className="text-neutral-500 line-through text-sm mb-1">₹{originalPrice.toFixed(0)}</span>
                      <span className="text-xs text-neutral-400 mb-1">/ night</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-500/80">
                      <Clock className="w-3 h-3" />
                      <span>Valid until {validityDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <Link href={`/booking/${room.id}`} className="w-full block text-center py-4 bg-amber-500/10 hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-500 border border-amber-500/50 hover:border-transparent text-amber-500 hover:text-neutral-950 font-bold rounded-xl transition-all group/btn">
                    Grab This Deal <ArrowRight className="inline-block w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
