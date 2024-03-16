import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { SellerShopEntity } from "../entities/SellerShopEntity";

export const sellerShopRouter = Router();

// api/sellershops
sellerShopRouter.get("/", async (req: Request, res: Response) => {
  const sellerShopRepository = getRepository(SellerShopEntity);
  const sellerShops = await sellerShopRepository.find();
  res.json(sellerShops);
});
