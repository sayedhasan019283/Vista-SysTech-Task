import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchema } from './products.validation';
import { productController } from './products.controller';

const router = express.Router();

router.post(
    '/create',
    validateRequest(ProductValidationSchema.productSchema),
    productController.createProductController
)

export const ProductRoute = router