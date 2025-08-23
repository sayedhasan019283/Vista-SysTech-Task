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
    const result = await PromoModel.findByIdAndUpdate(promoId, payload);
    return result
}

export const promoService = {
    createPromo,
    readSinglePromo,
    deletePromo,
    updatePromo,
    readAllPromo
}