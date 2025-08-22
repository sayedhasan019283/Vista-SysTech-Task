import mongoose, { Schema, Document } from 'mongoose';
import { TProduct, TVariant } from './products.interface';

// Define the product schema
const variantSchema = new Schema<TVariant>({
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  variants: [variantSchema], // Use the variant schema as an array
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the model
export const ProductModel = mongoose.model<TProduct>('Product', productSchema);