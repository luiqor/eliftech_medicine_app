import { CartItem } from "../../types/Cart";
import { Order } from "../../types/Order";
import apiClient from "../apiClient";

export const createOrder = async (order: {
  orderItems: CartItem[];
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
}) => {
  const response = await apiClient.post<{ message: string; order: Order }>(
    "api/orders/create_order",
    order
  );
  return response.data;
};
