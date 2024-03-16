import { Request, Response, Router } from "express";
import { ArrayContains, getRepository } from "typeorm";
import { ProductEntity } from "../entities/ProductEntity";

export const productRouter = Router();

// api/products
productRouter.get("/", async (req: Request, res: Response) => {
  const sellerShops = req.query.sellerShop;

  const productRepository = getRepository(ProductEntity);
  if (!sellerShops) {
    const products = await productRepository.find();
    res.json(products);
  } else {
    const products = await productRepository
      .createQueryBuilder("product")
      .innerJoin("product.sellerShops", "sellerShop")
      .andWhere("sellerShop.shopName = :sellerShop")
      .setParameters({ sellerShop: sellerShops })
      .getMany();
    res.json(products);
  }
});
