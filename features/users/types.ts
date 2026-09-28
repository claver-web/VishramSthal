export interface User {
  id: string;
  clerkId: string;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: Date;
}
