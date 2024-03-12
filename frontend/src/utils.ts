import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";

export const getError = (error: ApiError): string => {
    return error.response && error.response.data.message 
    ? error.response.data.message 
    : error.message
}

export const convertProductToCartItem = (product: Product) => {
    const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        sellerShop: product.sellerShop,
        countInStock: product.countInStock,
        qty: 1,
    }
    return cartItem
}