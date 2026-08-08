import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
    });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const venueId = formData.get('venueId') as string;

    if (!file || !venueId) {
      return NextResponse.json({ error: 'File and venueId are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: '/wedding-venues'
    });

    const venue = await prisma.weddingVenue.update({
      where: { id: venueId },
      data: {
        images: {
          push: response.url
        }
      }
    });

    return NextResponse.json({ url: response.url, venue });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
