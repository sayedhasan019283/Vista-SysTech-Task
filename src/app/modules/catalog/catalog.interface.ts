import { Document, Types } from 'mongoose';

// Define the interface for a Catalog variant
export type  TVariant = {
  size?: string;
  color?: string;
  price: number;
}

// Define the interface for a Catalog
export type TCatalog = Document & {
  name: string;
  description?: string;
  category: string;
  variants: TVariant[];
  createdAt: Date;
  updatedAt: Date;
}
