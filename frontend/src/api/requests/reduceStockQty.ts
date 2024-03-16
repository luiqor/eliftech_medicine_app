import { CartItem } from "../../types/Cart";
import apiClient from "../apiClient";

export const reduceStockQty = async (items: { id: string; qty: number }[]) => {
  const response = await apiClient.post<{
    message: string;
    cartItems: CartItem[];
  }>(`api/products/reduce-stock`, items);

  return response.data;
};
