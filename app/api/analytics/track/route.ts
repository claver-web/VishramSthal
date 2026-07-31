import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { path, device, source, sessionId } = await req.json();

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await prisma.visitorLog.create({
      data: {
        path,
        device,
        source,
        sessionId,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to log visit:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
