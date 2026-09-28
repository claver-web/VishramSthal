import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId: authUserId } = await auth();
    if (!authUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: authUserId },
      include: {
        bookings: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
