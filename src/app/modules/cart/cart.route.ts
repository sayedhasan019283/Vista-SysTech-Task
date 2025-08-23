import  express  from "express";
import { cartController } from "./cart.controller";
import validateRequest from "../../middlewares/validateRequest";
import { cartValidation } from "./cart.validation";


const router = express.Router()

router.post(
    '/create',
    validateRequest(cartValidation.AddItemSchema),
    cartController.createCart
)

router.get(
    '/get-cart-by-id/:cartId',
    cartController.getCartById
)
router.get(
    '/get-cart-by-token/:token',
    cartController.getCartByToken
)

router.post(
    '/add-to-cart/:cartId',
    cartController.addToCart
)

router.delete(
    '/delete/:cartId',
    cartController.deleteCart
)

router.get(
    '/remove-from-cart/:cartId/:productId',
    cartController.removeItemToCart
)

export const cartRouter = router