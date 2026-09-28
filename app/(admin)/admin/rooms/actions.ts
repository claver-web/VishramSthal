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

export async function getRoomById(id: string) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const room = await prisma.room.findUnique({ where: { id } });
    return room;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return null;
  }
}

export async function deleteRoom(id: string) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    await prisma.room.delete({ where: { id } });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete room:", error);
    return { success: false, error: error.message };
  }
}

export async function updateRoom(id: string, data: any) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const room = await prisma.room.update({
      where: { id },
      data: {
        number: data.number,
        type: data.type.toUpperCase(),
        name: data.name,
        theme: data.theme,
        price: Number(data.price),
        weekendPrice: data.weekendPrice ? Number(data.weekendPrice) : null,
        capacity: Number(data.capacity),
        size: data.size ? Number(data.size) : null,
        description: data.description,
        amenities: data.amenities,
        images: data.images,
        videoTour: data.videoTour,
        taxIncluded: data.taxIncluded,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        isAvailable: data.isAvailable,
      }
    });
    return { success: true, room };
  } catch (error: any) {
    console.error("Failed to update room:", error);
    return { success: false, error: error.message || "Failed to update room" };
  }
}
