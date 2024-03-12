export type CartItem = {
    name: string
    id:string
    price: number
    image: string | undefined
    sellerShop: Array<string> 
    countInStock: number
    qty: number
}


export type DeliveryInfo = {
    name: string
    email: string
    phone: string
    address: string
}

export type Cart = {
    cartItems: CartItem[]
    deliveryInfo: DeliveryInfo
    totalPrice: number
}