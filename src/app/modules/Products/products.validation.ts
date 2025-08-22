import { z } from 'zod';

// Define the Zod schema for a product variant
const createVariantSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
});

// Define the Zod schema for a product
const createProductSchema = z.object({
  body : z.object({
    name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  variants: z.array(createVariantSchema).min(1, 'At least one variant is required'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  })
});

const updateVariantSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number').optional(), // Make price optional for PATCH
});

// Define the Zod schema for a product (for PATCH API)
const updateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').optional(),  // Allow name to be optional in PATCH
  description: z.string().optional(),  // Allow description to be optional
  category: z.string().min(1, 'Category is required').optional(),  // Allow category to be optional in PATCH
  variants: z.array(updateVariantSchema).min(1, 'At least one variant is required').optional(), // Allow variants to be optional
  createdAt: z.date().optional(),  // createdAt can be updated in PATCH but optional
  updatedAt: z.date().optional(),  // updatedAt can be updated in PATCH but optional
});

export const ProductValidationSchema = {
    createProductSchema,
    updateProductSchema
}
