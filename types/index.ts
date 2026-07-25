export type RoomType = 'STANDARD' | 'DELUXE' | 'SUITE' | 'PREMIUM';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  price: number;
  capacity: number;
  description: string | null;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  room?: Room;
}
