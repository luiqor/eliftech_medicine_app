import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { ProductEntity } from '../entities/ProductEntity'
import { sampleProducts } from '../data'

export const seedRouter = Router()

seedRouter.get('/', async (req: Request, res: Response) => {
    const productRepository = getRepository(ProductEntity)
    await productRepository.clear()
    const createdProducts = await productRepository.save(sampleProducts)
    res.json({ createdProducts })
})