import { Product } from '../../types/Product'
import apiClient from '../apiClient'

export async function getProducts(shop: string){
    return (await apiClient.get<Product[]>(`api/products?sellerShop=${shop}`)).data
}
