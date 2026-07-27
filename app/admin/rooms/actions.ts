'use server';

export async function getRooms() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return rooms;
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return [];
  }
}
