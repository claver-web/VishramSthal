import React from 'react';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function CompareRoomsPage() {
  // Mock taking the top 3 rooms for comparison, ideally this would read from query params or a cookie/context
  const rooms = await prisma.room.findMany({
    take: 3,
    orderBy: { price: 'asc' }
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 mb-4 drop-shadow-md">
            Compare Sanctuaries
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Find the perfect divine abode for your stay. Compare amenities, sizes, and offerings side-by-side.
          </p>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center bg-neutral-900 p-12 rounded-3xl border border-neutral-800">
            <h2 className="text-2xl text-white font-serif mb-4">No Rooms Selected</h2>
            <p className="text-neutral-400 mb-8">Please select some rooms to compare them.</p>
            <Link href="/rooms" className="px-8 py-3 bg-amber-500 text-neutral-950 font-bold rounded-full hover:bg-amber-400 transition-colors">
              Browse Sanctuaries
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-8">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left border-b border-neutral-800 bg-neutral-900/50 w-1/4 rounded-tl-2xl">
                    <span className="text-xl text-amber-500 font-serif">Features</span>
                  </th>
                  {rooms.map((room, idx) => (
                    <th key={room.id} className={`p-4 text-center border-b border-neutral-800 bg-neutral-900/50 w-1/4 ${idx === rooms.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                      <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 border border-neutral-700">
                        <Image src={room.images[0] || 'https://images.unsplash.com/photo-1590490359683-658d3d23f972'} alt={room.name || 'Room'} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2">
                          <span className="text-white font-serif text-lg">{room.name || `Room ${room.number}`}</span>
                        </div>
                        <button className="absolute top-2 right-2 p-1 bg-black/50 text-white hover:text-red-500 rounded-full backdrop-blur-sm">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-2xl font-black text-amber-500 mb-4">₹{room.price}<span className="text-xs text-neutral-500 font-normal">/night</span></div>
                      <Link href={`/booking/${room.id}`} className="block w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all">
                        Book Now
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50 border-x border-b border-neutral-800 rounded-b-2xl bg-[#1a1a2e]/30">
                <tr>
                  <td className="p-4 text-neutral-400 font-medium">Capacity</td>
                  {rooms.map(room => (
                    <td key={room.id} className="p-4 text-center text-white font-medium">{room.capacity} Guests</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-neutral-400 font-medium">Room Size</td>
                  {rooms.map(room => (
                    <td key={room.id} className="p-4 text-center text-white font-medium">{room.size || 350} sq ft</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-neutral-400 font-medium bg-neutral-900/20">View Type</td>
                  {rooms.map(room => (
                    <td key={room.id} className="p-4 text-center text-amber-100 bg-neutral-900/20">{room.type === 'SUITE' ? 'Premium Garden' : 'Temple View'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-neutral-400 font-medium">Air Conditioning</td>
                  {rooms.map(room => (
                    <td key={room.id} className="p-4 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-neutral-400 font-medium bg-neutral-900/20">Attached Bathroom</td>
                  {rooms.map(room => (
                    <td key={room.id} className="p-4 text-center bg-neutral-900/20"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-neutral-400 font-medium">Special Amenities</td>
                  {rooms.map(room => (
                    <td key={room.id} className="p-4 text-center text-sm text-neutral-300">
                      {room.amenities && room.amenities.slice(0, 3).join(', ')}
                      {room.amenities && room.amenities.length > 3 && '...'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
