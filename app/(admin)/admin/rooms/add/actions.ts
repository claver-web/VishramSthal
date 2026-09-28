'use server';

import ImageKit from "imagekit";

export async function uploadRoomImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (publicKey && privateKey && urlEndpoint && !publicKey.includes('default')) {
      try {
        const ImageKit = (await import("imagekit")).default;
        const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

        return new Promise((resolve) => {
          imagekit.upload({
            file: base64Data,
            fileName: file.name || `image-${Date.now()}.jpg`,
            folder: '/Rooms'
          }, (error, result) => {
            if (error || !result?.url) {
              resolve({ success: true, url: dataUrl });
            } else {
              resolve({ success: true, url: result.url });
            }
          });
        });
      } catch (e) {
        return { success: true, url: dataUrl };
      }
    }

    return { success: true, url: dataUrl };
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
