import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const whereClause = type ? { type: type as any } : {};
    
    const venues = await prisma.weddingVenue.findMany({
      where: whereClause,
      orderBy: { priceStarting: 'asc' }
    });
    
    return NextResponse.json(venues);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const venue = await prisma.weddingVenue.create({
      data
    });
    return NextResponse.json(venue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create venue' }, { status: 500 });
  }
}
