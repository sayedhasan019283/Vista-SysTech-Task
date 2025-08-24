import express  from "express";
import { orderController } from "./order.controller";


const router = express.Router()
router.post(
    "/create/:cartId", 
    orderController.createOrder
);

router.get(
    '/get-all-order',
    orderController.getAllOrder
)
router.get(
    '/get-single-order/:orderId',
    orderController.getSingleOrder
)

export const orderRoute = router