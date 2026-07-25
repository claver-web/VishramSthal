import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ bookingId: string }> | { bookingId: string } }) {
  try {
    const resolvedParams = await params;
    const bookingId = resolvedParams.bookingId;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'PENDING' && booking.status !== 'CONFIRMED') {
      return NextResponse.json({ error: 'Cannot cancel this booking' }, { status: 400 });
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });

    // Mark room as available again
    await prisma.room.update({
      where: { id: booking.roomId },
      data: { isAvailable: true },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Cancel booking error:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
