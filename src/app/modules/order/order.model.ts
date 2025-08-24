import { Schema, model, Document, Types } from "mongoose";
import { TOrder, TOrderItem } from "./order.interface";


const orderItemSchema = new Schema<TOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    variant: { type: String },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);


const orderSchema = new Schema<TOrder>(
  {
    items: [orderItemSchema],
    promoCode: { type: String, default: null },
    subTotal: { type: Number, default: 0 },
    promoDiscountTotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    token: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const OrderModel = model("Order", orderSchema);
