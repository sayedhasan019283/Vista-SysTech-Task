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
    '/update',
    promoController.updatePromo
)
router.delete(
    '/delete/:promoId',
    promoController.deletePromo
)

export const promoRoute = router