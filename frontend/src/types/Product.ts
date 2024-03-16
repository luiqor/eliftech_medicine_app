import { SellerShop } from "./SellerShop";

export type Product = {
  name: string;
  id: string;
  price: number;
  image: string;
  sellerShop: SellerShop[];
  countInStock: number;
};
