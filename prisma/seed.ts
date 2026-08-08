import { PrismaClient, RoomType, WeddingVenueType } from '@prisma/client';

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

  // 3. Create Wedding Venues
  const weddingVenues = [
    {
      name: "Grand Banquet Hall",
      type: WeddingVenueType.BANQUET,
      capacity: 500,
      priceStarting: 200000,
      description: "Luxurious indoor setup with crystal chandeliers.",
      images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800"],
      amenities: ["Central AC", "Stage setup", "Bridal rooms", "Parking"],
    },
    {
      name: "Garden Lawns",
      type: WeddingVenueType.LAWN,
      capacity: 300,
      priceStarting: 150000,
      description: "Spacious outdoor lawns surrounded by greenery.",
      images: ["https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"],
      amenities: ["Open sky", "Fairy lights", "Valet parking", "Dining area"],
    },
    {
      name: "Terrace Venue",
      type: WeddingVenueType.TERRACE,
      capacity: 200,
      priceStarting: 100000,
      description: "Stunning semi-open area with sunset views.",
      images: ["https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800"],
      amenities: ["Panoramic views", "Lounge seating", "Covered dining", "Bar setup"],
    },
    {
      name: "Intimate Hall",
      type: WeddingVenueType.HALL,
      capacity: 100,
      priceStarting: 50000,
      description: "Cozy space for pre-wedding ceremonies.",
      images: ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800"],
      amenities: ["AC", "Audio setup", "Intimate lighting", "Dining"],
    }
  ];

  for (const venue of weddingVenues) {
    await prisma.weddingVenue.upsert({
      where: { name: venue.name },
      update: {},
      create: venue,
    });
  }
  
  console.log('Wedding venues seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
