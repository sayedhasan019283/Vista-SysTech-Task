import { z } from "zod";


const AddItemSchema = z.object({
  body : z.object({
    productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  })
});

const UpdateItemSchema = z.object({
   body : z.object({
    productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  })
});

const ApplyPromoSchema = z.object({
  promoCode: z.string().min(1, "Promo code is required"),
});

export const cartValidation = {
    AddItemSchema,
    UpdateItemSchema,
    ApplyPromoSchema
}