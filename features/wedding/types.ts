export interface WeddingVenue {
  id: string;
  name: string;
  capacity: number;
  description?: string;
  images: string[];
}

export interface WeddingEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  guests: number;
}
