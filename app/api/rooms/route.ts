import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const revalidate = 0; // Dynamic API since it depends on query params heavily

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const query = searchParams.get('q');
  const types = searchParams.get('type')?.split(',').filter(Boolean);
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const amenities = searchParams.get('amenities')?.split(',').filter(Boolean);
  const capacity = searchParams.get('capacity');
  const availableOnly = searchParams.get('available') !== 'false';
  const viewType = searchParams.get('view');
  const sort = searchParams.get('sort');

  try {
    let whereClause: Prisma.RoomWhereInput = {};

    if (availableOnly) {
      whereClause.isAvailable = true;
    }

    if (types && types.length > 0) {
      // @ts-ignore - Assuming RoomType enum is used
      whereClause.type = { in: types };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
    }

    if (capacity) {
      if (capacity === '4') {
        whereClause.capacity = { gte: 4 };
      } else {
        whereClause.capacity = parseInt(capacity, 10);
      }
    }

    if (amenities && amenities.length > 0) {
      whereClause.amenities = { hasEvery: amenities };
    }

    if (viewType) {
      if (whereClause.amenities) {
         // @ts-ignore
         whereClause.amenities.hasEvery = [...whereClause.amenities.hasEvery, viewType];
      } else {
         whereClause.amenities = { has: viewType };
      }
    }

    if (query) {
      // Searching by number or description since spiritual name is mapped to type in frontend
      whereClause.OR = [
        { number: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
      
      // If query matches a spiritual name loosely, map to type
      const q = query.toLowerCase();
      const mappedTypes = [];
      if ('tulsi nivas'.includes(q) || 'standard'.includes(q)) mappedTypes.push('STANDARD');
      if ('kunj kutir'.includes(q) || 'deluxe'.includes(q)) mappedTypes.push('DELUXE');
      if ('radha mahal'.includes(q) || 'suite'.includes(q)) mappedTypes.push('SUITE');
      if ('krishna kunj'.includes(q) || 'premium'.includes(q)) mappedTypes.push('PREMIUM');
      
      if (mappedTypes.length > 0) {
        // @ts-ignore
        whereClause.OR.push({ type: { in: mappedTypes } });
      }
    }

    // Determine Sorting
    let orderByClause: Prisma.RoomOrderByWithRelationInput = { price: 'asc' }; // default (recommended)

    if (sort === 'price_asc') {
      orderByClause = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderByClause = { price: 'desc' };
    } else if (sort === 'name_asc') {
      orderByClause = { type: 'asc' }; // Sort by type instead of name as room has no 'name'
    } else if (sort === 'capacity_asc') {
      orderByClause = { capacity: 'asc' };
    } else if (sort === 'popularity') {
      // Mock popularity by sort capacity descending
      orderByClause = { capacity: 'desc' };
    }

    const rooms = await prisma.room.findMany({
      where: whereClause,
      orderBy: orderByClause,
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Fetch rooms error:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
