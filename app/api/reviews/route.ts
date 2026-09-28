import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('roomId');

    const reviews = await prisma.review.findMany({
      where: {
        ...(roomId ? { roomId } : {}),
        status: 'APPROVED',
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId: authUserId } = await auth();
    if (!authUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: authUserId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const { roomId, rating, comment } = body;

    if (!roomId || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        roomId,
        rating: Number(rating),
        comment,
        status: 'PENDING',
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
