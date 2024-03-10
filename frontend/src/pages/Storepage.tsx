import { sampleProducts } from '../data'
import { Row, Col} from 'react-bootstrap';

export default function Storepage() {
  return (
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
}
