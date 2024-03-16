import { SellerShop } from "../../types/SellerShop";
import apiClient from "../apiClient";

export async function getSellershops() {
  return (await apiClient.get<SellerShop[]>("api/sellershops")).data;
}
