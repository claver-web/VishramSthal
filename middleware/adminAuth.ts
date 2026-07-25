import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function verifyAdminAuth(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  
  const admin = await prisma.admin.findFirst({ where: { token } });
  if (!admin) {
    throw new Error('Unauthorized');
  }

  return admin;
}
