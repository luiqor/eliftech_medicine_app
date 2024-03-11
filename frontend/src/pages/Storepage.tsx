import { sampleProducts } from '../data'
import { Row, Col} from 'react-bootstrap';
import { Product } from '../types/Product';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

type State = {
  products: Product[],
  loading: boolean,
  error: string
}

const initialState: State = {
  products: [],
  loading: true,
  error: ''
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

type Action =
| { type: 'FETCH_PRODUCTS_REQUEST' }
| { type: 'FETCH_PRODUCTS_SUCCESS', payload: Product[] }
| { type: 'FETCH_PRODUCTS_FAILURE', payload: string }

export default function Storepage() {
  const [{loading, error, products}, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState)

  useEffect (() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_PRODUCTS_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: getError(error as ApiError) })
      }
    }
    fetchProducts()
  }, [])

  return (
    loading ? (<LoadingBox/>)
    : error ? (<MessageBox variant="danger">{error}</MessageBox>)
    : (
    <div>
        <div className='text-center'>
          <h1> Medicine Delivery app</h1>
        </div>
        <Row>
        {sampleProducts.map((product) => 
            (<Col key={product.id} sm={6} md={3} lg={2}>
                <div className="product-image-container">
                    <img src={product.image} alt={product.id} className="product-image"></img>
                </div>
                <h2>{product.name}</h2>
                <p>{product.price}₴</p>
            </Col>))}
        </Row>
    </div>
    )
  )
}
