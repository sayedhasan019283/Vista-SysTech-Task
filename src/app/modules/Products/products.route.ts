import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchema } from './products.validation';
import { productController } from './products.controller';

const router = express.Router();

router.post(
    '/create',
    validateRequest(ProductValidationSchema.createProductSchema),
    productController.createProductController
)
router.patch(
    '/update',
    validateRequest(ProductValidationSchema.updateProductSchema),
    productController.updateProduct
)
router.get(
    '/get-all-product',
    productController.readAllProduct
)
router.get(
    '/get-single-product',
    productController.readSingleProduct
)

router.delete(
    '/delete',
    productController.deleteProduct
)

export const ProductRoute = router