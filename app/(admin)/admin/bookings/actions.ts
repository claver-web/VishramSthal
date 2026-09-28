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
      userId: b.userId,
      guest: b.user?.name || b.user?.email || 'Unknown',
      phone: b.user?.phone || 'No phone',
      email: b.user?.email || 'No email',
      loyalty: 0,
      requests: 'None',
      roomId: b.roomId,
      room: b.room?.name || 'Room ' + b.room?.number,
      type: b.room?.type || 'STANDARD',
      number: b.room?.number || '',
      checkIn: new Date(b.checkIn).toLocaleDateString(),
      checkOut: new Date(b.checkOut).toLocaleDateString(),
      rawCheckIn: b.checkIn.toISOString().split('T')[0],
      rawCheckOut: b.checkOut.toISOString().split('T')[0],
      nights: Math.max(1, Math.ceil((b.checkOut.getTime() - b.checkIn.getTime()) / (1000 * 3600 * 24))),
      guests: b.guests,
      amount: b.totalPrice,
      paymentStatus: b.razorpayPaymentId ? 'Paid' : 'Pending',
      razorpayId: b.razorpayPaymentId || 'N/A',
      status: b.status.charAt(0) + b.status.slice(1).toLowerCase(),
      rawStatus: b.status
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

export async function bulkUpdateBookingStatus(ids: string[], status: string) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const validStatus = status.toUpperCase() as any;
    const res = await prisma.booking.updateMany({
      where: { id: { in: ids } },
      data: { status: validStatus }
    });
    return { success: true, count: res.count };
  } catch (error: any) {
    console.error("Failed to bulk update status:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBookings(ids: string[]) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    await prisma.transaction.deleteMany({
      where: { bookingId: { in: ids } }
    });
    
    const res = await prisma.booking.deleteMany({
      where: { id: { in: ids } }
    });
    
    return { success: true, count: res.count };
  } catch (error: any) {
    console.error("Failed to delete bookings:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBookingDetails(id: string, data: {
  roomId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  guestName?: string;
  guestPhone?: string;
}) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true }
    });
    
    if (!booking) {
      return { success: false, error: "Booking not found" };
    }
    
    if (booking.userId && (data.guestName !== undefined || data.guestPhone !== undefined)) {
      await prisma.user.update({
        where: { id: booking.userId },
        data: {
          ...(data.guestName ? { name: data.guestName } : {}),
          ...(data.guestPhone ? { phone: data.guestPhone } : {}),
        }
      });
    }
    
    const updated = await prisma.booking.update({
      where: { id },
      data: {
        ...(data.roomId ? { roomId: data.roomId } : {}),
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        guests: Number(data.guests),
        totalPrice: Number(data.totalPrice),
        status: data.status.toUpperCase() as any,
      }
    });
    
    return { success: true, booking: updated };
  } catch (error: any) {
    console.error("Failed to update booking details:", error);
    return { success: false, error: error.message };
  }
}

export async function getRoomsList() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        number: true,
        price: true,
        type: true,
      },
      orderBy: { number: 'asc' }
    });
    return rooms;
  } catch (error) {
    console.error("Failed to fetch rooms list:", error);
    return [];
  }
}
