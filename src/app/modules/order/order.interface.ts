import { Types } from "mongoose";

export interface TOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  variant?: string;
  price: Number; 
}

export interface TOrder {
  items: TOrderItem[];
  promoCode: string | null;
  subTotal: number;
  promoDiscountTotal: number;
  total: number;
  token: string;
  name: string;
  address: string;
  phoneNumber: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}
