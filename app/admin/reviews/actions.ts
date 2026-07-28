'use server';

export async function getReviews() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { name: true, email: true } },
        room: { select: { number: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
}

export async function updateReviewStatus(id: string, status: string) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    await prisma.review.update({
      where: { id },
      data: { status }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addReply(id: string, reply: string) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  try {
    await prisma.review.update({
      where: { id },
      data: { reply }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
