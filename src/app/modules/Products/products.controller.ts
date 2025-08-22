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

const readAllProduct = async (req : Request ,res : Response, next : NextFunction) => {
    const result = await productService.readAllProduct()
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No Product Found")
    }
     return sendResponse(res, {
        code: StatusCodes.OK,
        message: "Get All product successfully.",
        data: result,
    });
}

const readSingleProduct = async (req : Request ,res : Response, next : NextFunction) => {
    const {productId} = req.params
    if (!productId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No product Found!")
    }
    const result = await productService.readSingleProduct(productId);
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Product Not Found!")
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message: "Product Found successfully.",
        data: result,
    });
}

const updateProduct = async  (req : Request ,res : Response, next : NextFunction) => {
    const  {productId} = req.params;
    const payload = req.body;
    if (!productId && !payload) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Something went wrong!")
    }
    const result = await productService.updateProduct(productId, payload)
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Something Went Wrong')
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message: "Product Update successfully.",
        data: result,
    });
}

const deleteProduct = async (req : Request ,res : Response, next : NextFunction) => {
    const {productId} = req.params;
    if (!productId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Something went wrong!")
    }
    const result = await productService.deleteProduct(productId);
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Something Went Wrong')
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message: "Product Deleted successfully.",
        data: result,
    });

}

export const productController = {
    createProductController,
    readAllProduct,
    readSingleProduct,
    updateProduct,
    deleteProduct
}