import { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";



const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cartId } = req.params; 
    const { name, address, phoneNumber } = req.body; 

  
    const order = await orderService.createOrderFromCart(cartId, { name, address, phoneNumber });

 
    if (!order) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Order Cart Not found!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Order Submit Successfully.",
            data: order,
        });
  } catch (error) {
    next(error); 
  }
};


const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    const result = await orderService.getAlleOrder()
    if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Cart Not found!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Cart remove Item Successfully.",
            data: result,
        });
}
const getSingleOrder = async (req: Request, res: Response, next: NextFunction) => {

    const {orderId} = req.params
    const result = await orderService.getSingleOrder(orderId)

    if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "order Not found!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "get one Order Successfully.",
            data: result,
        });
}


export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder
};
