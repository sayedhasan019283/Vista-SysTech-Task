import { parse } from './../../../../node_modules/@types/uuid/index.d';
import { TCart } from "./cart.interface";
import { CartModel } from "./cart.model";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { CatalogModel } from "../catalog/catalog.model";

type CreateCartPayload = {
  productId: string; // string from client
  quantity: number;
  variant : string,
  price : number
};

const createCartFromDB = async (payload: CreateCartPayload) => {
    const { productId, quantity, variant, price } = payload;

    const token = uuidv4();
    const product = await CatalogModel.aggregate([
    {
      $match: { _id: new Types.ObjectId(productId) },
    },
    {
      $unwind: "$variants",
    },
    {
      $match: { "variants.size": variant }, 
    },
    {
      $project: {
        price: "$variants.price",
        size: "$variants.size",
        color: "$variants.color",
        _id: 0,
      },
    },
  ]);
    console.log("==========>>>" ,product, variant)
    
    const cartData: Partial<TCart> = {
        token,
        items: [{
            productId: new Types.ObjectId(productId),
            quantity,
            variant,
            price : product[0].price
        }],
        promoCode: null,
        subTotal: product[0].price * quantity,
        promoDiscountTotal: 0,
        total: product[0].price * quantity,
    };

    const result = await CartModel.create(cartData);
    return result;
};

const getCartByIdFromDB = async (cartId : string) => {
    // Check if valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    throw new Error("Invalid Cart ID format");
  }
    const result = await CartModel.findById( cartId)
    if (!result) {
        return "No cart Found"
    }
    return result
}
const getCartByTokenFromDB = async (token : string) => {
    const result = await CartModel.find({token : token})
    return result
}


const addToCartFromDB = async (cartId: string, payload: CreateCartPayload) => {
    const { productId, quantity, variant } = payload;
    const cart = await CartModel.findById(cartId); 
    const productIdToCheck = new Types.ObjectId(productId);

    if (!cart) {
        throw new Error('Cart not found');
    }

    const product = await CatalogModel.findOne(productIdToCheck)
    if (!product) {
        throw new Error('product not found');
    }
    console.log("product=========>>>>>>>", product)
    // Check if the product already exists in the cart with the same variant
    const productExist = cart.items.find(
        (item) => item.productId.toString() === productIdToCheck.toString() && item.variant === variant
    );
    const productFind = product.variants.find(
  (item) => item.size!.toString() === variant
);

console.log("productFind=====>>>>", productFind)


    if (productExist) {
        // Update the quantity if product exists
        const totalQuantity = productExist.quantity + quantity;
        
        // Ensure price is a number
        const price = Number(productExist.price) || 0;
        
        // Update quantity and recalculate total price
        productExist.quantity = totalQuantity;
        const totalPrice = totalQuantity * price;

        // Update cart total
        cart.subTotal = totalPrice - cart.promoDiscountTotal;
        cart.total = totalPrice;

        console.log('Total price:', totalPrice);

        // Save the updated cart after modifying the product
        await cart.save();  // Save the cart after updating quantity and recalculating totals
    } else {
        // If product does not exist, just push the payload data to the items array
        cart.items.push({
            productId: productIdToCheck,
            quantity,
            variant,
            price: productFind!.price, // assuming price is included in the payload
        });

        // Get the existing cart total
        const existingTotal = cart.total;

        // Add the new product's total to the existing total
        const newProductTotal = quantity * (Number(productFind!.price) || 0);
        cart.subTotal = existingTotal + newProductTotal - cart.promoDiscountTotal;
        cart.total = cart.subTotal;

        // Save the updated cart after adding the new item
        await cart.save();
    }

    console.log(cart);
    return cart;
};


const deleteCartFromDB = async (cartId : string) => {
    const result = await CartModel.findByIdAndDelete(cartId);
    return result;
}

const removeItemFromCart = async (cartId: string, productId: string) => {
    const cart = await CartModel.findById(cartId); 
    if (!cart) {
        throw new Error('Cart not found');
    }

    const productIdToCheck = new Types.ObjectId(productId);

    // Check if the product exists in the cart
    const productIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productIdToCheck.toString()
    );

    if (productIndex === -1) {
        throw new Error('Product not found in cart');
    }

    // Remove the product from the items array
    const removedItem = cart.items.splice(productIndex, 1)[0];

    // Recalculate subTotal by subtracting the removed item price
    const removedProductTotal = removedItem.quantity * Number(removedItem.price);
    cart.subTotal -= removedProductTotal;

    // Recalculate total by adjusting for any promoDiscountTotal
    cart.total = cart.subTotal - cart.promoDiscountTotal;

    console.log('Removed product:', removedItem);
    console.log('Updated subTotal:', cart.subTotal);
    console.log('Updated total:', cart.total);

    // Save the updated cart after removal
    await cart.save();

    return cart;
};


export const cartService = {
    createCartFromDB,
    getCartByIdFromDB,
    getCartByTokenFromDB,
    addToCartFromDB,
    deleteCartFromDB,
    removeItemFromCart
}