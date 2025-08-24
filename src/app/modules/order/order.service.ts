import ApiError from "../../../errors/ApiError";
import { CartModel } from "../cart/cart.model";
import { TOrder, TOrderItem } from "./order.interface";
import { OrderModel } from "./order.model";


const createOrderFromCart = async (cartId: string, orderData: {
  name: string;
  address: string;
  phoneNumber: string;
}): Promise<TOrder> => {

  const cart = await CartModel.findById(cartId);
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  
  const orderDataToSave = {
    items: cart.items.map((item): TOrderItem => ({
      productId: item.productId,
      quantity: item.quantity,
      variant: item.variant,
      price: item.price,
    })),
    promoCode: cart.promoCode,
    subTotal: cart.subTotal,
    promoDiscountTotal: cart.promoDiscountTotal,
    total: cart.total,
    token: cart.token,
    name: orderData.name,
    address: orderData.address,
    phoneNumber: orderData.phoneNumber,
    status: 'Pending', 
  };


  const newOrder = await OrderModel.create(orderDataToSave);

  return newOrder;
};

const getSingleOrder = async(orderId : string) => {
    const result = await OrderModel.findById(orderId)
    return result
}
const getAlleOrder = async () => {
    const result = await OrderModel.find({});
    return result
}

export const orderService = {
    createOrderFromCart,
    getSingleOrder,
    getAlleOrder
}