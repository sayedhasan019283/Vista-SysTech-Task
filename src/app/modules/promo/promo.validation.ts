import { z } from "zod";

export const createPromoValidation = z.object({
  body: z.object({
    code: z.string().min(2, "Promo code must be at least 2 characters long"),
    percent: z
      .number()
      .min(0, "Percent must be at least 0")
      .max(100, "Percent cannot be more than 100"),
  }),
});
