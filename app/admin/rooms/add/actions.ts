'use server';

import ImageKit from "imagekit";

export async function uploadRoomImage(formData: FormData) {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'default_public_key',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'default_private_key',
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/default'
    });

    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');

    return new Promise((resolve, reject) => {
      imagekit.upload({
        file: base64Data,
        fileName: file.name || 'room-image.jpg',
        folder: '/Rooms'
      }, (error, result) => {
        if (error) {
          reject({ success: false, error: error.message });
        } else {
          resolve({ success: true, url: result?.url });
        }
      });
    });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveRoom(data: any) {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const room = await prisma.room.create({
      data: {
        number: data.number,
        type: data.type.toUpperCase(),
        name: data.name,
        theme: data.theme,
        price: Number(data.price),
        weekendPrice: data.weekendPrice ? Number(data.weekendPrice) : null,
        capacity: Number(data.capacity),
        size: data.size ? Number(data.size) : null,
        description: data.description,
        amenities: data.amenities,
        images: data.images,
        videoTour: data.videoTour,
        taxIncluded: data.taxIncluded,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        isAvailable: data.isAvailable,
      }
    });
    
    return { success: true, room };
  } catch (error: any) {
    console.error("Failed to save room:", error);
    return { success: false, error: error.message || "Failed to save room" };
  }
}
