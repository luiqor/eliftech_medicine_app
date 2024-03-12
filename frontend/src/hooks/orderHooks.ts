import { useMutation } from '@tanstack/react-query'
import { CartItem } from '../types/Cart'
import { Order } from '../types/Order'
import apiClient from '../api/apiClient'

export const useCreateOrderMutation = () => useMutation({
    mutationFn: async (order:{
        orderItems: CartItem[],
        customerName: string,
        email: string,
        phone: string,
        address: string,
        totalPrice: number
    }) => (await apiClient.post<{message: string, order: Order}>('api/create_order', order)).data
}) 