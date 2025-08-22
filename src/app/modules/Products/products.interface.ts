import { Document, Types } from 'mongoose';

// Define the interface for a product variant
export type  TVariant = {
  size?: string;
  color?: string;
  price: number;
}

// Define the interface for a product
export type TProduct = Document & {
  name: string;
  description?: string;
  category: string;
  variants: TVariant[];
  createdAt: Date;
  updatedAt: Date;
}
