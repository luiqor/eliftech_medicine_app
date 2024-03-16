import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { ProductEntity } from "../entities/ProductEntity";
import { sampleProducts } from "../data";
import { SellerShopEntity } from "../entities/SellerShopEntity";

export const seedRouter = Router();

seedRouter.get("/", async (req: Request, res: Response) => {
  const productRepository = getRepository(ProductEntity);
  const shopRepository = getRepository(SellerShopEntity);

  try {
    await shopRepository.query('TRUNCATE TABLE "sellershops" CASCADE');
    await productRepository.query('TRUNCATE TABLE "products" CASCADE');

    for (const product of sampleProducts) {
      const newProduct = new ProductEntity();
      newProduct.id = product.id;
      newProduct.name = product.name;
      newProduct.price = product.price;
      newProduct.image = product.image;
      newProduct.countInStock = product.countInStock;

      newProduct.sellerShops = [];

      for (const shopName of product.shops) {
        // Check if a shop with the same name already exists
        let shop = await shopRepository.findOne({ where: { shopName } });

        // If the shop doesn't exist, create a new one
        if (!shop) {
          shop = new SellerShopEntity();
          shop.shopName = shopName;
          await shopRepository.save(shop);
        }

        // Add the shop to the product's sellerShops
        newProduct.sellerShops.push(shop);
      }

      await productRepository.save(newProduct);
    }

    const createdProducts = await productRepository.find({
      relations: ["sellerShops"],
    });

    res.json({ createdProducts });
  } catch (error: unknown) {
    res.status(500).json({
      error: "Failed to seed data",
      details: (error as Error).message,
    });
  }
});
