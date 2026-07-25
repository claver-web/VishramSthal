import { PrismaClient, RoomType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Admin user
  const admin = await prisma.admin.upsert({
    where: { username: 'Admin' },
    update: {},
    create: {
      username: 'Admin',
      password: 'admin', // Note: In production, password should be hashed
    },
  });
  console.log('Admin user seeded:', admin.username);

  // 2. Create Rooms
  const rooms = [
    // Standard Rooms (3)
    ...Array.from({ length: 3 }).map((_, i) => ({
      number: `S${101 + i}`,
      type: RoomType.STANDARD,
      price: 2000,
      capacity: 2,
      description: 'Comfortable standard room located near Word No. 6 Dehra Gopipur, perfect for budget travelers offering essential comforts.',
      amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Attached Bathroom'],
      images: [], // Add actual image URLs later
    })),
    // Deluxe Rooms (3)
    ...Array.from({ length: 3 }).map((_, i) => ({
      number: `D${201 + i}`,
      type: RoomType.DELUXE,
      price: 4000,
      capacity: 3,
      description: 'Spacious deluxe room with premium furnishings in the heart of Word No. 6 Dehra Gopipur. Enjoy enhanced comfort and amenities.',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Mini Fridge', 'Room Service'],
      images: [],
    })),
    // Suite Rooms (3)
    ...Array.from({ length: 3 }).map((_, i) => ({
      number: `SU${301 + i}`,
      type: RoomType.SUITE,
      price: 8000,
      capacity: 4,
      description: 'Luxurious suite offering scenic views and exclusive amenities at our Word No. 6 Dehra Gopipur property. Features a dedicated living area.',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Mini Fridge', 'Living Area', 'Bathtub', 'Premium Toiletries'],
      images: [],
    })),
    // Premium Rooms (2)
    ...Array.from({ length: 2 }).map((_, i) => ({
      number: `P${401 + i}`,
      type: RoomType.PREMIUM,
      price: 12000,
      capacity: 4,
      description: 'The ultimate premium experience with top-tier luxury and a stunning ambience located in Word No. 6 Dehra Gopipur. Unmatched elegance.',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Mini Bar', 'Living Area', 'Jacuzzi', 'Private Balcony', 'Butler Service'],
      images: [],
    })),
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { number: room.number },
      update: {},
      create: room,
    });
  }
  
  console.log('Rooms seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
