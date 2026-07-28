'use server';

export async function getBookings() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        room: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return bookings.map(b => ({
      id: b.id,
      date: new Date(b.createdAt).toLocaleDateString(),
      guest: b.user?.name || b.user?.email || 'Unknown',
      phone: b.user?.phone || 'No phone',
      email: b.user?.email || 'No email',
      loyalty: 0,
      requests: 'None',
      room: b.room?.name || 'Room ' + b.room?.number,
      type: b.room?.type || 'STANDARD',
      number: b.room?.number || '',
      checkIn: new Date(b.checkIn).toLocaleDateString(),
      checkOut: new Date(b.checkOut).toLocaleDateString(),
      nights: Math.max(1, Math.ceil((b.checkOut.getTime() - b.checkIn.getTime()) / (1000 * 3600 * 24))),
      guests: b.guests,
      amount: b.totalPrice,
      paymentStatus: b.razorpayPaymentId ? 'Paid' : 'Pending',
      razorpayId: b.razorpayPaymentId || 'N/A',
      status: b.status.charAt(0) + b.status.slice(1).toLowerCase()
    }));
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

export async function updateBookingStatus(id: string, status: string) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    await prisma.booking.update({
      where: { id },
      data: { status: status.toUpperCase() as any }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
