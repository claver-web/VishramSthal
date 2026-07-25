import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 3600; // ISR revalidate every hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  try {
    let whereClause: any = { isAvailable: true }; // Only public available rooms
    if (type && type !== 'ALL') {
      whereClause.type = type;
    }

    const rooms = await prisma.room.findMany({
      where: whereClause,
      orderBy: { price: 'asc' },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Fetch rooms error:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
