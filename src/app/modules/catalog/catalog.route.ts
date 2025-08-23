import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CatalogController } from './catalog.controller';
import { CatalogValidationSchema } from './catalog.validation';

const router = express.Router();

router.post(
    '/create',
    validateRequest(CatalogValidationSchema.createCatalogSchema),
    CatalogController.createCatalogController
);

router.patch(
    '/update/:CatalogId', 
    validateRequest(CatalogValidationSchema.updateCatalogSchema),
    CatalogController.updateCatalog
);


router.get(
    '/get-all-catalog',
    CatalogController.readAllCatalog
);


router.get(
    '/get-single-catalog/:CatalogId', 
    CatalogController.readSingleCatalog
);


router.delete(
  '/delete/:CatalogId', 
  CatalogController.deleteCatalog
);

export const CatalogRoute = router;
