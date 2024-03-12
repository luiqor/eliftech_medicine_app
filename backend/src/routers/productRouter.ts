import { Request, Response, Router } from 'express'
import { ArrayContains, getRepository} from 'typeorm'
import { ProductEntity } from '../entities/ProductEntity'

export const productRouter = Router()

// api/products
productRouter.get('/', async (req: Request, res: Response) => {
    const sellerShops = req.query.sellerShop as string
    
    const productRepository = getRepository(ProductEntity)
    if (!sellerShops) {
        const products = await productRepository.find()
        res.json(products)
    } else {
        console.log(sellerShops)
        const products = await productRepository.findBy({ sellerShop: ArrayContains([sellerShops]) })
    res.json(products)
    }
})