import { NextFunction, Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { productService } from "./products.service";
import sendResponse from "../../../shared/sendResponse";

const createProductController = async (req : Request, res : Response, next : NextFunction) => {
    const payload = req.body;
    if (!payload) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Request body is missing');
    }
    const result = await productService.createProductService(payload);
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Product didn't created!")
    }
     return sendResponse(res, {
        code: StatusCodes.CREATED,
        message: "Product is created successfully.",
        data: result,
    });
}

export const productController = {
    createProductController
}