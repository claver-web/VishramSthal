import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username !== 'Admin' || password !== 'admin') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = crypto.randomBytes(32).toString('hex');

    await prisma.admin.upsert({
      where: { username: 'Admin' },
      update: { token },
      create: { username: 'Admin', password: 'admin', token },
    });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
