export type { Booking, BookingStatus } from '@/types';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}
