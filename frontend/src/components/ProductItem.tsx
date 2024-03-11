import { Button, Card } from "react-bootstrap"
import { Product } from "../types/Product"

function ProductItem({ product }: { product: Product }) {
  return <Card>
    <div className="product-image-container">
        <img src={product.image} alt={product.id} className="product-image"></img>
   </div>
  <Card.Body>
    <Card.Title>
        {product.name}
    </Card.Title>
    <Card.Text>
       {product.price}₴
    </Card.Text>
    {product.countInStock === 0 ? 
    (<Button variant='outline-primary' disabled>Out of stock</Button>)
    :( <Button variant='primary'>Add to cart</Button>)}
  </Card.Body>
  </Card>
}

export default ProductItem