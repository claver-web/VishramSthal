import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username !== 'Admin' || password !== 'admin') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Bypass slow database upserts entirely for Admin login.
    // We sign a fast, stateless JWT token instead.
    const secret = process.env.ADMIN_JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign({ username: 'Admin', role: 'admin' }, secret, { expiresIn: '24h' });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
