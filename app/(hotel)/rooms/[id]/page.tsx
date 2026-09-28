import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import RoomDetailsClient from '@/features/rooms/components/RoomDetails';

export const dynamic = 'force-dynamic';

export default async function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = await prisma.room.findUnique({
    where: { id }
  });

  if (!room) {
    notFound();
  }

  const image = room.images && room.images.length > 0 
    ? room.images[0] 
    : 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800';

  return <RoomDetailsClient room={room} />;
}
