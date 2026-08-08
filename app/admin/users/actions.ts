'use server';

export async function getUsers() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const users = await prisma.user.findMany({
      include: {
        bookings: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return users.map(u => {
      const totalSpent = u.bookings.reduce((sum, b) => sum + b.totalPrice, 0);
      const totalStays = u.bookings.filter(b => b.status === 'COMPLETED').length;
      const totalBookings = u.bookings.length;
      
      return {
        id: u.id,
        name: u.name || u.email.split('@')[0],
        photo: (u.name || u.email)[0].toUpperCase(),
        email: u.email,
        phone: u.phone || 'N/A',
        joined: new Date(u.createdAt).toLocaleDateString(),
        status: 'Active',
        bookings: totalBookings,
        spent: totalSpent,
        loyaltyTier: totalStays >= 5 ? 'Gold' : totalStays >= 2 ? 'Silver' : 'Bronze',
        // Mock wedding data
        type: Math.random() > 0.6 ? 'Both' : (Math.random() > 0.5 ? 'Hotel Guest' : 'Wedding Client'),
        weddingEvents: Math.floor(Math.random() * 3),
        weddingSpent: Math.floor(Math.random() * 500000),
      };
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}
