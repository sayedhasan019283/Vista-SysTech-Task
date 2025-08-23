import { NextFunction, Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { CatalogService } from "./catalog.service";
import sendResponse from "../../../shared/sendResponse";

// Create Catalog
const createCatalogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        if (!payload) {
            return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: 'Request body is missing',
            });
        }
        const result = await CatalogService.createCatalogService(payload);
        if (!result) {
            return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Catalog wasn't created!",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.CREATED,
            message: "Catalog created successfully.",
            data: result,
        });
    } catch (error) {
        return next(error); // Pass the error to the global error handler
    }
}

// Get All Catalogs
const readAllCatalog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await CatalogService.readAllCatalog();
        if (!result || result.length === 0) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "No catalogs found.",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Fetched all catalogs successfully.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

// Get Single Catalog by ID
const readSingleCatalog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { CatalogId } = req.params;
        const result = await CatalogService.readSingleCatalog(CatalogId);
        if (!result) {
            return sendResponse(res, {
                code: StatusCodes.NOT_FOUND,
                message: "Catalog not found.",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Catalog found successfully.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

// Update Catalog
const updateCatalog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { CatalogId } = req.params;
        const payload = req.body;

        if (!payload) {
            return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: 'Request body is missing.',
            });
        }

        const result = await CatalogService.updateCatalog(CatalogId, payload);
        if (!result) {
            return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Catalog update failed.",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Catalog updated successfully.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

// Delete Catalog
const deleteCatalog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { CatalogId } = req.params;
        const result = await CatalogService.deleteCatalog(CatalogId);
        if (!result) {
            return sendResponse(res, {
                code: StatusCodes.BAD_REQUEST,
                message: "Catalog deletion failed.",
            });
        }
        return sendResponse(res, {
            code: StatusCodes.OK,
            message: "Catalog deleted successfully.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

export const CatalogController = {
    createCatalogController,
    readAllCatalog,
    readSingleCatalog,
    updateCatalog,
    deleteCatalog
}
