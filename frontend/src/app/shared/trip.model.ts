export interface Trip {
  id: number;
  userId: number;
  name: string;
  description: string;
  coverImageUrl: string;
  startDate: string;   // or Date if you convert it
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
