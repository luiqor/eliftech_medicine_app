import { Row, Col} from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../hooks/productHooks'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'

export default function Storepage() {
  
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    isLoading ? (<LoadingBox/>)
    : error ? (<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>)
    : (
    <div>
        <div className='text-center'>
          <h1> Medicine Delivery app</h1>
        </div>
        <Row>
        {products!.map((product) => 
            (<Col key={product.id} sm={6} md={3} lg={2}>
                <ProductItem product={product}/>
            </Col>))}
        </Row>
    </div>
    )
  )
}
