import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch recent bookings (last 10)
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        room: true,
      },
    });

    // 2. Fetch today's visitor count
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayVisitorLogs = await prisma.visitorLog.findMany({
      where: {
        createdAt: { gte: startOfToday },
      },
    });

    const uniqueSessionsToday = new Set(todayVisitorLogs.map(l => l.sessionId)).size;
    const totalPageViewsToday = todayVisitorLogs.length;

    // 3. Transform bookings into notification items
    const bookingNotifications = recentBookings.map((b) => {
      const guestName = b.user?.name || b.user?.email || 'Guest';
      const roomTitle = b.room ? `Room ${b.room.number}` : 'Room';
      const isConfirmed = b.status === 'CONFIRMED';
      
      const timeDiffMs = Date.now() - new Date(b.createdAt).getTime();
      const minutesAgo = Math.floor(timeDiffMs / (1000 * 60));
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);

      let timeAgoStr = 'Just now';
      if (daysAgo > 0) timeAgoStr = `${daysAgo}d ago`;
      else if (hoursAgo > 0) timeAgoStr = `${hoursAgo}h ago`;
      else if (minutesAgo > 0) timeAgoStr = `${minutesAgo}m ago`;

      return {
        id: b.id,
        title: isConfirmed ? `Room Booked & Confirmed` : `New Booking Request (${b.status})`,
        message: `${guestName} booked ${roomTitle} for ₹${b.totalPrice}`,
        time: timeAgoStr,
        createdAt: b.createdAt,
        type: 'booking',
        status: b.status,
        amount: b.totalPrice,
        roomNumber: b.room?.number || '',
        guest: guestName,
      };
    });

    // 4. Milestone Visitor Notification if visitors today > 0
    const visitorNotifications = uniqueSessionsToday > 0 ? [{
      id: 'visitor-summary-today',
      title: 'Daily Website Traffic',
      message: `${uniqueSessionsToday} unique visitor(s) & ${totalPageViewsToday} page view(s) today`,
      time: 'Today',
      createdAt: new Date(),
      type: 'analytics',
    }] : [];

    const allNotifications = [...bookingNotifications, ...visitorNotifications];

    return NextResponse.json({
      notifications: allNotifications,
      unreadCount: bookingNotifications.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED').length,
      todayVisitors: uniqueSessionsToday,
      todayPageViews: totalPageViewsToday,
    });
  } catch (error: any) {
    console.error('Failed to fetch admin notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
