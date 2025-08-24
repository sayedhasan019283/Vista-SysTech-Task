import { NextFunction, Request, Response } from "express";
import { promoService } from "./promo.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createPromo = async (req : Request, res : Response, next : NextFunction) => {
    const payload = req.body;
    const result = await promoService.createPromo(payload);
    if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "Promo Not Created",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Promo Created successfully.",
            data: result,
        });
}

const readAllPromo = async (req : Request, res : Response, next : NextFunction) => {
    const result = await promoService.readAllPromo()
    if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "didn't get promo",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Promo get successfully.",
            data: result,
        });
}
const readSinglePromo = async (req : Request, res : Response, next : NextFunction) => {
    const {promoId} = req.params
    const result = await promoService.readSinglePromo(promoId)

    if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "no Promo Found",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Promo Found successfully.",
            data: result,
        });
}
const deletePromo = async (req : Request, res : Response, next : NextFunction) => {
    const {promoId} = req.params 
    const result = await promoService.deletePromo(promoId)
    if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "Delete Unsuccessful",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Promo deleted successfully.",
            data: result,
        });
}
const updatePromo = async (req : Request, res : Response, next : NextFunction) => {

    const payload = req.body;
    const {promoId} = req.params
    
    const result = await promoService.updatePromo( payload, promoId)

    if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "Promo Not Updated",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Promo updated successfully.",
            data: result,
        });
}

const checkPromoCode = async (req : Request, res : Response, next : NextFunction) => {

    const payload = req.body;
    const {cartId} = req.params

    const result = await promoService.checkPromoCode(payload, cartId)

    if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "Something Went Wrong",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Promo Code Used successfully.",
            data: result,
        });
}

export const promoController = {
    createPromo,
    readAllPromo,
    readSinglePromo,
    updatePromo,
    deletePromo,
    checkPromoCode

}