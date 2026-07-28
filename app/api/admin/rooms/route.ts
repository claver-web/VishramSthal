import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    // Build Prisma query conditionally
    const where: any = {};
    if (type) where.type = type;
    if (status) where.isAvailable = status !== 'Booked';

    const rooms = await prisma.room.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: rooms });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real scenario, we'd validate the admin token here
    // using a middleware or a utility function before allowing creation.
    
    const newRoom = await prisma.room.create({
      data: {
        number: body.number || `RM-${Date.now().toString().slice(-4)}`,
        name: body.name,
        type: body.type,
        price: body.price,
        capacity: body.capacity,
        description: body.description,
        amenities: body.amenities || [],
        images: body.images || [],
        isAvailable: body.status !== 'Booked',
      }
    });

    return NextResponse.json({ success: true, data: newRoom }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
