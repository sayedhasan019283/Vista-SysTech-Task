import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";

const createProductService = async (payload : TProduct) => {
    const result = await ProductModel.create(payload);
    return result;
}

export const productService = {
    createProductService
}