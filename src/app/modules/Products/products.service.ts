import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";

const createProductService = async (payload : TProduct) => {
    const result = await ProductModel.create(payload);
    return result;
}

const readAllProduct = async () => {
    const result = await ProductModel.find({});
    return result
}

const readSingleProduct = async (ProductId : string) => {
    const result = await ProductModel.findById(ProductId);
    return result;
}

const updateProduct = async ( productId : string ,payload : Partial<TProduct> ) => {
    const result = await ProductModel.findByIdAndUpdate(productId, payload, {new : true} )
    return result;
}

const deleteProduct = async (ProductId : string) => {
    const result = await ProductModel.findByIdAndDelete(ProductId);
    return result;
}

export const productService = {
    createProductService,
    readAllProduct,
    readSingleProduct,
    updateProduct,
    deleteProduct
}