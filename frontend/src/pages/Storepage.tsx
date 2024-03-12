import { Row, Col, Button} from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { getProducts } from '../api/requests/getProducts'

const INITIAL_SHOP_VALUE = ""
const SHOPS_AMOUNT = 4


export default function Storepage() {
  const [shop, setShop] = useState<string>(INITIAL_SHOP_VALUE)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [products, setProducts] = useState<Product[] | null>(null)

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

  return (
    isLoading ? (<LoadingBox/>)
    : error ? (<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>)
    : (
    <div>
        <div className='text-center'>
          <h1> Medicine Delivery app</h1>
        </div>
        
            
        
        <Row>
          <Col  md={2}>
          {Array.from({length: SHOPS_AMOUNT}).map((_, index) => 
          <Row className="mb-3">
              <Button variant={shop === `Pharmacy ${index + 1}` ? 'secondary': 'primary'} 
              onClick={() => handleShopChange(`Pharmacy ${index + 1}`)}>
              Pharmacy {index + 1}
              </Button>
              </Row>
            )}
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
