import { CartItem } from "./Cart"

export type Order = {
    id: string
    customerName: string
    email: string
    phone: string
    address: string
    items: CartItem[]
    totalPrice: number
    isPaid: boolean
    isShipped: boolean
}