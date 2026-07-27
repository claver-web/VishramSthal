import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  // Use a reliable Unsplash hotel room image
  const image = 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800';

  return (
    <div className="container mx-auto px-4 py-32 mt-20">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="relative h-96 w-full bg-gray-700">
          <Image 
            src={image} 
            alt="Room Image" 
            fill 
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/e79fwAJzAPm44z/YQAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        <div className="p-10 relative -mt-16 bg-gray-800 mx-8 rounded-2xl border border-gray-700 shadow-xl">
          <h1 className="text-4xl font-serif text-[var(--color-gold)] mb-4">Divine Sanctuary Details</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Immerse yourself in complete spiritual tranquility. This luxurious abode features handcrafted wooden furnishings, expansive views of the sacred gardens, and all modern amenities designed to facilitate deep rest and meditation.
          </p>
          <div className="flex gap-4">
            <Link href="/rooms" className="px-6 py-3 border-2 border-orange-500 text-orange-400 font-bold rounded-xl hover:bg-orange-500/10 transition-colors">
              Back to Sanctuaries
            </Link>
            <Link href={`/booking/${params.id}`} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all">
              Reserve Your Stay 🪷
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
