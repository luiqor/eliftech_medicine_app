import { Row, Col, Button} from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { getProducts } from '../api/requests/getProducts'
import { getSellershops } from '../api/requests/getSellershops'
import { SellerShop } from '../types/SellerShop'

const INITIAL_SHOP_VALUE = ""

export default function Storepage() {
  const [shop, setShop] = useState<string>(INITIAL_SHOP_VALUE)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [products, setProducts] = useState<Product[] | null>(null)
  const [sellerShops, setSellerShop] = useState<SellerShop[] | null>(null)

  const handleShopChange = (newShop: string) => {
    if(newShop === shop) {
      setShop(INITIAL_SHOP_VALUE) 
    return
    }
    
    setShop(newShop) 
  }

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getProducts(shop)
        setProducts(data)
      } catch (err) {
        setError(err as unknown as ApiError)
      }
      setIsLoading(false)
    }
    fetchData()
  
    
  }, [shop])

  useEffect(() => {
    const fetchSellerShops = async () => {
      setIsLoading(true)
      try {
        const data = await getSellershops() // Assuming you have a function to fetch sellerShops
        setSellerShop(data)
      } catch (err) {
        setError(err as unknown as ApiError)
      }
      setIsLoading(false)
    }
    fetchSellerShops()
  }, [])

  return (
    isLoading ? (<LoadingBox/>)
    : error ? (<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>)
    : (
    <div>
        <div className='text-center'>
          <h1> Medicine Delivery app</h1>
        </div>
        <Row>
            <Col md={2}>
            {sellerShops?.map((sellerShop) => (
              <Row className="mb-3" key={String(sellerShop.shopName)}>
                <Button 
                   variant={shop === String(sellerShop.shopName) ? 'secondary' : 'primary'} 
                  onClick={() => handleShopChange(String(sellerShop.shopName))}>
                  {String(sellerShop.shopName)}
                </Button>
              </Row>
            ))}
            </Col>
        {products?.map((product) => 
            (<Col key={product.id} sm={6} md={3} lg={2}>
                <ProductItem product={product}/>
            </Col>))}
        </Row>
    </div>
    )
  )
}
