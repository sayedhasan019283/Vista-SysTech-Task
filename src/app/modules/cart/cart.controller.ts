import { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCart = async (req : Request, res : Response, next : NextFunction) => {
    const payload = req.body;
    // console.log("payload=========" ,payload)
    const result = await cartService.createCartFromDB(payload);
    if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Cart Not Created!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Cart Created Successfully.",
            data: result,
        });
}

const getCartById = async (req : Request, res : Response, next : NextFunction) => {
    const {cartId} = req.params;
    const result = await cartService.getCartByIdFromDB(cartId);
    if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Cart Not Found!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Cart Found Successfully.",
            data: result,
        });
}
const getCartByToken = async (req : Request, res : Response, next : NextFunction) => {
    const {token} = req.params;
    const result = await cartService.getCartByTokenFromDB(token) 
    if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Cart Not found!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Cart Found Successfully.",
            data: result,
        });
}

const addToCart = async (req : Request, res : Response, next : NextFunction) => {
    const {cartId} = req.params
    const payload = req.body
    const result = await cartService.addToCartFromDB(cartId, payload);
     if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Cart Not found!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Cart Add Item Successfully.",
            data: result,
        });
}

const deleteCart = async (req : Request, res : Response, next : NextFunction) => {
    const {cartId} = req.params;
    const result = cartService.deleteCartFromDB(cartId);
    if (!result) {
        return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Cart Not deleted!",
            });
    }
    return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Cart deleted Successfully.",
            data: result,
        });
}

const removeItemToCart = async (req : Request, res : Response, next : NextFunction) => {
    const {cartId, productId} = req.params
    
    const result = await cartService.removeItemFromCart(cartId, productId);
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

export const cartController = {
    createCart, 
    getCartById,
    getCartByToken,
    addToCart,
    deleteCart,
    removeItemToCart
}