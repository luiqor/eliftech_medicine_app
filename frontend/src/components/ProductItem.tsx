import { Button, Card } from "react-bootstrap"
import { Product } from "../types/Product"
import { useContext } from "react"
import { Store } from "../Store"
import { CartItem } from "../types/Cart"
import { convertProductToCartItem } from "../utils"

function ProductItem({ product }: { product: Product }) {
  const {state, dispatch} = useContext(Store)
  const{
    cart: {cartItems},
  } = state
  const addToCartHandler = (product: CartItem) => {
    const existItem = cartItems.find((x) => x.id === product.id)
    const qty = existItem ? existItem.qty + 1 : 1
    if (product.countInStock < qty) {
      alert(`Sorry, ${product.name} is out of stock`)
      return
    }
    dispatch({type: 'ADD_TO_CART', payload: {...product, qty}})
  }
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
    :( <Button onClick={() => addToCartHandler(convertProductToCartItem(product))} variant='primary'>Add to cart</Button>)}
  </Card.Body>
  </Card>
}

export default ProductItem