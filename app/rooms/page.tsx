import React, { Suspense } from 'react';
import RoomsContent from './RoomsContent';
import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { MapPin, Users, Star, Hotel, Sparkles, ChevronDown } from 'lucide-react';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

async function getRoomsStats() {
  const totalRooms = await prisma.room.count();
  const featuredRoom = await prisma.room.findFirst({
    where: { type: { in: ['SUITE', 'PREMIUM'] } },
    orderBy: { price: 'desc' }
  });
  
  return {
    totalRooms,
    guestsServed: 1250, // Mocked for now, can be aggregated from bookings
    avgRating: 4.8, // Mocked for now
    featuredRoom
  };
}

export default async function RoomsPage() {
  const stats = await getRoomsStats();

  return (
    <div className="min-h-screen bg-neutral-950 transition-colors pt-16">
      
      {/* Main Grid section */}
      <Suspense fallback={<div className="container mx-auto px-4 text-center py-20 text-neutral-400">Loading Divine Abodes...</div>}>
        <div className="pb-20 pt-8">
          <RoomsContent />
        </div>
      </Suspense>
    </div>
  );
}
