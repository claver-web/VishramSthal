import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const admin = await prisma.admin.findFirst({ where: { token } });
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch stats
    const totalUsers = await prisma.user.count();
    const totalBookings = await prisma.booking.count();
    
    const allBookings = await prisma.booking.findMany();
    const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    const totalRooms = await prisma.room.count();
    const occupiedRooms = await prisma.room.count({ where: { isAvailable: false } });
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    // Fetch users
    const users = await prisma.user.findMany({
      include: {
        _count: { select: { bookings: true } },
        bookings: { select: { totalPrice: true } }
      }
    });

    const mappedUsers = users.map(u => ({
      ...u,
      totalSpent: u.bookings.reduce((sum, b) => sum + b.totalPrice, 0),
    }));

    // Fetch bookings
    const bookings = await prisma.booking.findMany({
      include: { user: true, room: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    // Fetch rooms
    const rooms = await prisma.room.findMany({
      orderBy: { number: 'asc' }
    });

    // Chart data
    const charts = {
      bookingsByType: [
        { name: 'Standard', value: bookings.filter(b => b.room?.type === 'STANDARD').length },
        { name: 'Deluxe', value: bookings.filter(b => b.room?.type === 'DELUXE').length },
        { name: 'Suite', value: bookings.filter(b => b.room?.type === 'SUITE').length },
        { name: 'Premium', value: bookings.filter(b => b.room?.type === 'PREMIUM').length },
      ],
      statusDist: [
        { name: 'PENDING', value: bookings.filter(b => b.status === 'PENDING').length },
        { name: 'CONFIRMED', value: bookings.filter(b => b.status === 'CONFIRMED').length },
        { name: 'CANCELLED', value: bookings.filter(b => b.status === 'CANCELLED').length },
        { name: 'COMPLETED', value: bookings.filter(b => b.status === 'COMPLETED').length },
      ]
    };

    return NextResponse.json({
      stats: { totalUsers, totalBookings, totalRevenue, occupancyRate },
      charts,
      users: mappedUsers,
      bookings,
      rooms
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
