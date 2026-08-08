import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const venue = await prisma.weddingVenue.findUnique({
      where: { id: resolvedParams.id }
    });
    
    if (!venue) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(venue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch venue' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await request.json();
    const venue = await prisma.weddingVenue.update({
      where: { id: resolvedParams.id },
      data
    });
    return NextResponse.json(venue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update venue' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.weddingVenue.delete({
      where: { id: resolvedParams.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete venue' }, { status: 500 });
  }
}
