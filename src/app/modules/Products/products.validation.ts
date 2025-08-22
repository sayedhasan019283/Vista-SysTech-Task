import { z } from 'zod';

// Define the Zod schema for a product variant
const variantSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
});

// Define the Zod schema for a product
const productSchema = z.object({
  body : z.object({
    name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  })
});

export const ProductValidationSchema = {
    productSchema
}
