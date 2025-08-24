import ApiError from "../../../errors/ApiError";
import { CartModel } from "../cart/cart.model";
import { TPromo } from "./promo.interface";
import { PromoModel } from "./promo.model";

const createPromo = async (payload : TPromo) => {
    const result = await PromoModel.create(payload);
    return result
}

const readSinglePromo = async (promoId : string) => {
    const result = await PromoModel.findById(promoId);
    return result
}
const readAllPromo = async () => {
    const result = await PromoModel.find();
    return result
}

const deletePromo = async (promoId : string) => {
    const result = await PromoModel.findByIdAndDelete(promoId);
    return result
}

const updatePromo = async (payload : Partial<TPromo>, promoId : string) => {
    const result = await PromoModel.findByIdAndUpdate(promoId, payload, {new : true});
    return result
}

const checkPromoCode = async (payload: Partial<TPromo>, cartId: string) => {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    const promo = await PromoModel.findOne({code : payload.code})
    if (!promo) {
        throw new ApiError(404 ,'promo not found');
    }
    console.log(promo.percent)
    cart.promoCode = payload.code ?? null;

    const percent = promo.percent;
    if (percent === undefined || isNaN(percent)) {
        throw new Error('Invalid or missing percent value for promo code');
    }

    const promoDis = (cart.subTotal / 100) * percent;

    // Update the promo discount total and total price
    cart.promoDiscountTotal = promoDis;
    cart.total = cart.subTotal - promoDis;

    // total is never negative
    if (cart.total < 0) {
        cart.total = 0;
    }

    await cart.save();

    return cart;
};



export const promoService = {
    createPromo,
    readSinglePromo,
    deletePromo,
    updatePromo,
    readAllPromo,
    checkPromoCode
}