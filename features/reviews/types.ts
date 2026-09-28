export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
  isApproved?: boolean;
}
