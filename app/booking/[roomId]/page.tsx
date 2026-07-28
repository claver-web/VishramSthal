import React from 'react';
import BookingFlow from '@/components/booking/BookingFlow';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { ShieldCheck, Star, Award, Users, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function BookingPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  
  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) notFound();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6 font-medium">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-amber-500 transition-colors">Divine Abodes</Link>
          <span>/</span>
          <Link href={`/rooms/${room.id}`} className="hover:text-amber-500 transition-colors">{room.name || `Room ${room.number}`}</Link>
          <span>/</span>
          <span className="text-amber-500">Booking</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 mb-8 drop-shadow-md">
          Complete Your Divine Booking
        </h1>

        {/* 3.3 Pre-booking Information Banner */}
        <div className="bg-gradient-to-r from-amber-900/40 to-neutral-900 border border-amber-500/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-900/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-full shrink-0">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-amber-400 font-bold text-lg">🌟 Special Divine Offer Active</p>
              <p className="text-neutral-300 text-sm">Book 3+ nights to receive a complimentary Aarti access pass & 10% discount on your stay.</p>
            </div>
          </div>
          <div className="text-sm font-bold bg-neutral-950 text-amber-500 px-4 py-2 rounded-full border border-amber-500/20 whitespace-nowrap">
            Limited Time Only
          </div>
        </div>

        <BookingFlow room={room} />
      </div>
    </div>
  );
}
