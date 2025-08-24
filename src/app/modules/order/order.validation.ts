import { z } from "zod";


const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  variant: z.string().optional(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
});


const orderSchema = z.object({
body : z.object({
      items: z.array(orderItemSchema).min(1, "At least one item is required"),
  promoCode: z.string().nullable().optional(),
  subTotal: z.number().min(0, "Subtotal must be greater than or equal to 0"),
  promoDiscountTotal: z.number().min(0, "Promo discount must be greater than or equal to 0"),
  total: z.number().min(0, "Total must be greater than or equal to 0"),
  token: z.string(),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  status: z.enum(['Pending', 'Shipped', 'Delivered', 'Cancelled']).default('Pending'),
})
});

export type OrderType = z.infer<typeof orderSchema>;
