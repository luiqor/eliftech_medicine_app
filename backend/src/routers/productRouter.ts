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

// api/products/reduce-stock
productRouter.post("/reduce-stock", async (req, res) => {
  const items = req.body;
  const productRepository = getRepository(ProductEntity);

  for (const item of items) {
    const product = await productRepository.findOne({ where: { id: item.id } });

    if (!product || product.countInStock < item.qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.countInStock -= item.qty;
    await productRepository.save(product);
  }

  res.json({ message: "Stock reduced successfully" });
});
