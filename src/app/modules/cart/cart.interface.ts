import { Schema, model, Document, Types } from "mongoose";

export type TCartItem = {
  productId: Types.ObjectId;
  quantity: number;
  variant : string,
  price : Number
}

export type TCart = Document & {
  items: TCartItem[];
  promoCode: string | null;
  subTotal: number;
  promoDiscountTotal: number;
  total: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
};



