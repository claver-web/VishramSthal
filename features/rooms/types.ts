export type { Room, RoomType } from '@/types';

export interface RoomFilterState {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
}
