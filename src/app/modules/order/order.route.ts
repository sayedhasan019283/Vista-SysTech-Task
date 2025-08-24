import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

/**
 * @swagger
 * /order/create/{cartId}:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID to create the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phoneNumber
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               promoCode:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "68ab21f985f67d766a17239e"
 *                     quantity:
 *                       type: number
 *                       example: 10
 *                     variant:
 *                       type: string
 *                       example: "M"
 *                     price:
 *                       type: number
 *                       example: 21.99
 *     responses:
 *       200:
 *         description: Order submitted successfully
 *       400:
 *         description: Bad request
 */
router.post("/create/:cartId", orderController.createOrder);

/**
 * @swagger
 * /order/get-all-order:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: List of all orders
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
 *                       _id:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: string
 *                               example: "68ab21f985f67d766a17239e"
 *                             quantity:
 *                               type: number
 *                               example: 10
 *                             variant:
 *                               type: string
 *                               example: "M"
 *                             price:
 *                               type: number
 *                               example: 21.99
 *                       total:
 *                         type: number
 *                         example: 91.96
 *                       status:
 *                         type: string
 *                         enum: [Pending, Shipped, Delivered, Cancelled]
 *                         example: "Pending"
 *       400:
 *         description: Bad request
 */
router.get('/get-all-order', orderController.getAllOrder);

/**
 * @swagger
 * /order/get-single-order/{orderId}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                             example: "68ab21f985f67d766a17239e"
 *                           quantity:
 *                             type: number
 *                             example: 10
 *                           variant:
 *                             type: string
 *                             example: "M"
 *                           price:
 *                             type: number
 *                             example: 21.99
 *                     total:
 *                       type: number
 *                       example: 91.96
 *                     status:
 *                       type: string
 *                       enum: [Pending, Shipped, Delivered, Cancelled]
 *                       example: "Pending"
 *       404:
 *         description: Order not found
 */
router.get('/get-single-order/:orderId', orderController.getSingleOrder);

export const orderRoute = router;
