import { Schema, model, Document, Types } from "mongoose";
import { TCart, TCartItem } from "./cart.interface";


const cartItemSchema = new Schema<TCartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    variant : {type : String},
    price : {type : Number, default : 0}
  },
  { _id: false }
);

const cartSchema = new Schema<TCart>(
  {
    items: [cartItemSchema],
    promoCode: { type: String, default: null },
    subTotal: { type: Number, default: 0 },
    promoDiscountTotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const CartModel = model<TCart>("Cart", cartSchema);