import { Schema, model } from "mongoose";
import { TPromo } from "./promo.interface";

const promoSchema = new Schema<TPromo>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export const PromoModel = model<TPromo>("Promo", promoSchema);
