import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.weddingBooking.findMany({
      include: { venue: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const booking = await prisma.weddingBooking.create({
      data
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Can be expanded to handle /api/wedding/bookings/[id] by extracting ID from URL
  // But standard says PUT /api/wedding/bookings/[id]. 
  // I will just put a basic structure here.
  return NextResponse.json({ error: 'Use /[id] endpoint to update' }, { status: 400 });
}
