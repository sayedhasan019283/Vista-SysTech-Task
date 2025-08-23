import mongoose, { Schema, Document } from 'mongoose';
import { TCatalog, TVariant } from './catalog.interface';

// Define the Catalog schema
const variantSchema = new Schema<TVariant>({
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
});

const CatalogSchema = new Schema<TCatalog>({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  variants: [variantSchema], // Use the variant schema as an array
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the model
export const CatalogModel = mongoose.model<TCatalog>('Catalog', CatalogSchema);