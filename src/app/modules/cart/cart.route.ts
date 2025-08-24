import express from 'express';
import { cartController } from './cart.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cartValidation } from './cart.validation';

const router = express.Router();

/**
 * @swagger
 * /cart/create:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "68ab295b0402183f51848074"
 *               variant:
 *                 type: string
 *                 example: "S"
 *               quantity:
 *                 type: number
 *                 example: 3
 *               price:
 *                 type: number
 *                 example: 19.99
 *     responses:
 *       200:
 *         description: Cart created successfully.
 */
router.post('/create', validateRequest(cartValidation.AddItemSchema), cartController.createCart);

/**
 * @swagger
 * /cart/get-cart-by-id/{cartId}:
 *   get:
 *     summary: Get cart details by cart ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: Cart found successfully
 */
router.get('/get-cart-by-id/:cartId', cartController.getCartById);

/**
 * @swagger
 * /cart/get-cart-by-token/{token}:
 *   get:
 *     summary: Get cart details by cart token
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart token
 *     responses:
 *       200:
 *         description: Cart found successfully
 */
router.get('/get-cart-by-token/:token', cartController.getCartByToken);

/**
 * @swagger
 * /cart/add-to-cart/{cartId}:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "68ab295b0402183f51848074"
 *               variant:
 *                 type: string
 *                 example: "M"
 *               quantity:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Item added to the cart successfully
 */
router.post('/add-to-cart/:cartId', cartController.addToCart);

/**
 * @swagger
 * /cart/delete/{cartId}:
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID to delete
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 */
router.delete('/delete/:cartId', cartController.deleteCart);

/**
 * @swagger
 * /cart/remove-from-cart/{cartId}/{productId}:
 *   get:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to remove
 *     responses:
 *       200:
 *         description: Item removed from the cart successfully
 */
router.get('/remove-from-cart/:cartId/:productId', cartController.removeItemToCart);

export const cartRouter = router;
