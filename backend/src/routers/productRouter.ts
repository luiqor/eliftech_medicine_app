import { Request, Response, Router } from 'express'
import { Any, ArrayContains, getRepository, In } from 'typeorm'
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
        const products = await productRepository.findBy({ sellerShop: ArrayContains([sellerShops]) });
    res.json(products)
    }
})


// export const productSellerRouter = Router()
// // api/products?sellerShop=<sellerShop>
// productRouter.get('/sellerShop/:sellerShop', async (req: Request, res: Response) => {
//     const productRepository = getRepository(ProductEntity)
//     const sellerShop = req.query.sellerShop as string 
//     const products = await productRepository.find({ where: { sellerShop } }) 
//     res.json(products)
// })