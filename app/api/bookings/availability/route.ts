import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Note: In a real app, this should be a singleton, but defining here for the skeleton
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { roomId, checkIn, checkOut } = await request.json();

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // 1. Check if room exists and is available
    // (Requires Room schema with `isAvailable` boolean)
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.isAvailable === false) {
      return NextResponse.json({ available: false, reason: 'Room is currently offline' });
    }

    // 2. Check for overlapping bookings
    // Overlap condition: Booking checkIn < requested checkOut AND Booking checkOut > requested checkIn
    // Status in ['CONFIRMED', 'PENDING']
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        roomId: roomId,
        status: {
          in: ['CONFIRMED', 'PENDING'],
        },
        AND: [
          { checkIn: { lt: checkOutDate } },
          { checkOut: { gt: checkInDate } },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json({ available: false, reason: 'Dates are already booked' });
    }

    return NextResponse.json({ available: true });

  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
