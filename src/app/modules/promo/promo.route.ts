import express from 'express'
import { promoController } from './promo.controller'


const router = express.Router()

router.post(
    '/create',
    promoController.createPromo
)
router.get(
    '/get-all-promo',
    promoController.readAllPromo
)
router.get(
    '/get-single-promo/:promoId',
    promoController.readSinglePromo
)
router.patch(
    '/update/:promoId',
    promoController.updatePromo
)
router.delete(
    '/delete/:promoId',
    promoController.deletePromo
)

router.post(
    '/check-promo/:cartId',
    promoController.checkPromoCode
)

export const promoRoute = router