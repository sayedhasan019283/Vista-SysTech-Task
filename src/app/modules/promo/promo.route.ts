import express from 'express';
import { promoController } from './promo.controller';

const router = express.Router();

/**
 * @swagger
 * /promo/create:
 *   post:
 *     summary: Create a new promo
 *     description: Creates a new promo with a given code and percent discount.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - percent
 *             properties:
 *               code:
 *                 type: string
 *                 description: Promo code.
 *                 example: "VISTA SYS"
 *               percent:
 *                 type: number
 *                 format: float
 *                 description: Promo discount percentage.
 *                 example: 15
 *     responses:
 *       200:
 *         description: Promo created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "VISTA SYS"
 *                 percent:
 *                   type: number
 *                   example: 15
 *                 _id:
 *                   type: string
 *                   example: "68ab29670402183f51848079"
 *       400:
 *         description: Bad request
 */
router.post(
  '/create', 
  promoController.createPromo
);
/**
 * @swagger
 * /promo/get-all-promo:
 *   get:
 *     summary: Get all promos
 *     description: Fetch all the available promos.
 *     responses:
 *       200:
 *         description: List of promos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: "VISTA SYS"
 *                       percent:
 *                         type: number
 *                         example: 15
 *                       _id:
 *                         type: string
 *                         example: "68ab29670402183f51848079"
 *                       createdAt:
 *                         type: string
 *                         example: "2025-08-24T15:01:59.964Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2025-08-24T15:01:59.964Z"
 *       404:
 *         description: No promos found.
 */
router.get('/get-all-promo', promoController.readAllPromo);

/**
 * @swagger
 * /promo/get-single-promo/{promoId}:
 *   get:
 *     summary: Get a single promo by ID
 *     description: Fetch promo details for a specific promoId.
 *     parameters:
 *       - name: promoId
 *         in: path
 *         required: true
 *         description: The ID of the promo to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Promo found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "VISTA SYS"
 *                     percent:
 *                       type: number
 *                       example: 15
 *                     _id:
 *                       type: string
 *                       example: "68ab29670402183f51848079"
 *       404:
 *         description: Promo not found.
 */
router.get('/get-single-promo/:promoId', promoController.readSinglePromo);

/**
 * @swagger
 * /promo/update/{promoId}:
 *   patch:
 *     summary: Update an existing promo
 *     description: Update promo details for a specific promoId.
 *     parameters:
 *       - name: promoId
 *         in: path
 *         required: true
 *         description: The ID of the promo to update.
 *         schema:
 *           type: string
 *       - name: code
 *         in: body
 *         required: true
 *         description: Promo code.
 *         schema:
 *           type: string
 *       - name: percent
 *         in: body
 *         required: true
 *         description: Promo discount percentage.
 *         schema:
 *           type: number
 *           format: float
 *           example: 20
 *     responses:
 *       200:
 *         description: Promo updated successfully.
 *       404:
 *         description: Promo not found.
 */
router.patch('/update/:promoId', promoController.updatePromo);

/**
 * @swagger
 * /promo/delete/{promoId}:
 *   delete:
 *     summary: Delete a promo by ID
 *     description: Remove a promo from the system.
 *     parameters:
 *       - name: promoId
 *         in: path
 *         required: true
 *         description: Promo ID to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Promo deleted successfully.
 *       404:
 *         description: Promo not found.
 */
router.delete('/delete/:promoId', promoController.deletePromo);

/**
 * @swagger
 * /promo/check-promo/{cartId}:
 *   post:
 *     summary: Check promo code for a cart
 *     description: Apply promo code to a cart and calculate the new total.
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: Cart ID to apply promo.
 *         schema:
 *           type: string
 *       - name: code
 *         in: body
 *         required: true
 *         description: Promo code to check.
 *         schema:
 *           type: string
 *           example: "VISTA SYS Update"
 *     responses:
 *       200:
 *         description: Promo applied successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 promoCode:
 *                   type: string
 *                   example: "VISTA SYS Update"
 *                 total:
 *                   type: number
 *                   example: 135.94
 *       404:
 *         description: Promo code not found.
 */
router.post('/check-promo/:cartId', promoController.checkPromoCode);

export const promoRoute = router;
