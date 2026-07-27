import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { differenceInDays, parseISO } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId: authUserId } = await auth();
    const body = await req.json();
    const { roomId, userId, checkIn, checkOut, guests, paymentMethod } = body;

    // Use authenticated user if available, otherwise fallback to provided (for testing/admin)
    const finalUserId = authUserId || userId;

    if (!finalUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch the room to get the correct price
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const checkInDate = typeof checkIn === 'string' ? parseISO(checkIn) : new Date(checkIn);
    const checkOutDate = typeof checkOut === 'string' ? parseISO(checkOut) : new Date(checkOut);
    
    let days = differenceInDays(checkOutDate, checkInDate);
    if (days <= 0) days = 1; // Minimum 1 day

    // Basic pricing calculation (can be expanded to include weekend prices, taxes, etc.)
    const totalPrice = days * room.price;

    // Set status based on payment method
    const status = paymentMethod === 'CASH' ? 'PENDING' : 'CONFIRMED';

    const booking = await prisma.booking.create({
      data: {
        userId: finalUserId,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests ? parseInt(guests.toString(), 10) : 1,
        totalPrice,
        status,
        paymentMethod: paymentMethod || 'ONLINE',
      },
      include: {
        room: true,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
