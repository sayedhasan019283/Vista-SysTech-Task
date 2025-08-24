import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CatalogController } from './catalog.controller';
import { CatalogValidationSchema } from './catalog.validation';

const router = express.Router();

/**
 * @swagger
 * /catalog/create:
 *   post:
 *     summary: Create a new catalog item
 *     tags: [Catalog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - variants
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Catalog created successfully
 */
router.post(
    '/create',
    validateRequest(CatalogValidationSchema.createCatalogSchema),
    CatalogController.createCatalogController
);

/**
 * @swagger
 * /catalog/get-all-catalog:
 *   get:
 *     summary: Get all catalog items
 *     tags: [Catalog]
 *     responses:
 *       200:
 *         description: List of catalog items
 */
router.get('/get-all-catalog', CatalogController.readAllCatalog);

/**
 * @swagger
 * /catalog/get-single-catalog/{CatalogId}:
 *   get:
 *     summary: Get a single catalog item by ID
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: CatalogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The catalog ID
 *     responses:
 *       200:
 *         description: Catalog item found
 */
router.get('/get-single-catalog/:CatalogId', CatalogController.readSingleCatalog);

/**
 * @swagger
 * /catalog/update/{CatalogId}:
 *   patch:
 *     summary: Update a catalog item
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: CatalogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The catalog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Catalog updated successfully
 */
router.patch(
  '/update/:CatalogId',
  validateRequest(CatalogValidationSchema.updateCatalogSchema),
  CatalogController.updateCatalog
);

/**
 * @swagger
 * /catalog/delete/{CatalogId}:
 *   delete:
 *     summary: Delete a catalog item
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: CatalogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The catalog ID
 *     responses:
 *       200:
 *         description: Catalog deleted successfully
 */
router.delete('/delete/:CatalogId', CatalogController.deleteCatalog);

export const CatalogRoute = router;
