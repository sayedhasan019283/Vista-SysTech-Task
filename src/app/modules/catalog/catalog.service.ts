import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { TCatalog } from "./catalog.interface";
import { CatalogModel } from "./catalog.model";

const createCatalogService = async (payload : TCatalog) => {
    const result = await CatalogModel.create(payload);
    return result;
}

const readAllCatalog = async () => {
    const result = await CatalogModel.find({});
    return result
}

const readSingleCatalog = async (CatalogId : string) => {
    console.log(CatalogId)
    const result = await CatalogModel.findById({_id : CatalogId});
    return result;
}

const updateCatalog = async ( CatalogId : string ,payload : Partial<TCatalog> ) => {
    const result = await CatalogModel.findByIdAndUpdate(CatalogId, payload, {new : true} )
    return result;
}

const deleteCatalog = async (CatalogId : string) => {
    const result = await CatalogModel.findByIdAndDelete({_id : CatalogId});
    return result;
}

export const CatalogService = {
    createCatalogService,
    readAllCatalog,
    readSingleCatalog,
    updateCatalog,
    deleteCatalog
}