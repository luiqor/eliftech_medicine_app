import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../entities/ProductEntity'

export const productRouter = Router();

// api/products
productRouter.get('/', async (req: Request, res: Response) => {
    const productRepository = getRepository(ProductEntity)
    const products = await productRepository.find()
    res.json(products)
})