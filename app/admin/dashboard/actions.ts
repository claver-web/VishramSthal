'use server';

export async function getDashboardData() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const totalRooms = await prisma.room.count();
    const activeBookings = await prisma.booking.count({ where: { status: 'CONFIRMED' } });
    
    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);
    const bookingsToday = await prisma.booking.findMany({
      where: { createdAt: { gte: startOfToday } }
    });
    const revenueToday = bookingsToday.reduce((sum, b) => sum + b.totalPrice, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0,0,0,0);
    const bookingsThisMonth = await prisma.booking.findMany({
      where: { createdAt: { gte: startOfMonth } }
    });
    const totalRevenue = bookingsThisMonth.reduce((sum, b) => sum + b.totalPrice, 0);

    const newUsers = await prisma.user.count({
      where: { createdAt: { gte: startOfMonth } }
    });

    const reviews = await prisma.review.findMany();
    const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0';

    const recentActivityRaw = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });

    const recentActivity = recentActivityRaw.map(b => ({
      id: b.id,
      activity: 'New Booking',
      user: b.user?.name || b.user?.email || 'Guest',
      time: new Date(b.createdAt).toLocaleString(),
      status: b.status === 'CONFIRMED' ? 'Success' : b.status === 'PENDING' ? 'Warning' : 'Info'
    }));

    const upcomingCheckInsRaw = await prisma.booking.findMany({
      where: { checkIn: { gte: startOfToday }, status: 'CONFIRMED' },
      take: 4,
      orderBy: { checkIn: 'asc' },
      include: { user: true, room: true }
    });

    const upcomingCheckIns = upcomingCheckInsRaw.map(b => ({
      id: b.id,
      name: b.user?.name || b.user?.email || 'Guest',
      room: b.room?.name || b.room?.number,
      time: new Date(b.checkIn).toLocaleDateString()
    }));

    const pendingReviews = await prisma.review.count({ where: { status: 'PENDING' } });
    const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });

    return {
      stats: {
        totalRooms,
        activeBookings,
        revenueToday,
        totalRevenue,
        newUsers,
        avgRating,
        totalReviews: reviews.length,
        pendingReviews,
        pendingBookings
      },
      recentActivity,
      upcomingCheckIns
    };

  } catch (error) {
    console.error(error);
    return null;
  }
}
