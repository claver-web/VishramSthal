import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const mediaItems = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(mediaItems);
  } catch (error: any) {
    console.error('GET /api/media error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, filename, type, size } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const newMedia = await prisma.media.create({
      data: {
        url,
        filename: filename || `image-${Date.now()}.jpg`,
        type: type || 'image/jpeg',
        size: size ? Number(size) : 0,
      },
    });

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/media error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/media error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
