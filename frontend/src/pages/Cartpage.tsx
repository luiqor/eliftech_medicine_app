import { useContext } from "react"
import { useNavigate } from "react-router"
import { Store } from "../Store"
import { Button, Col, ListGroup, Row } from "react-bootstrap"
import MessageBox from "../components/MessageBox"
import { Link } from "react-router-dom"
import { CartItem } from "../types/Cart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Cartpage() {
    const navigate = useNavigate()

    const {
        state: { cart: {cartItems}, },
    dispatch,
    } = useContext(Store)
    const updateCartHandler = (item: CartItem, qty: number) =>{
    if (item.countInStock <= qty) {
        alert(`Sorry, out of stock`)
        return
    }
    dispatch({
        type: 'ADD_TO_CART',
        payload: {...item, qty},
    })}
    const checkoutHandler = () => {
        navigate('/redirect=/shipping')}

    const removeItemHandler = (item: CartItem) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: item})
    }

return(
    <div>
        <div className='text-center'>
          <h1> Shopping Cart</h1>
        </div>
        <Row>
            <Col md={6}>
            <div className="d-flex justify-content-center align-items-center"><h4>Personal info</h4></div>
            </Col>
            <Col md={6}>
                {cartItems.length === 0 ? (
                <MessageBox> Cart is empty. <Link to="/">Choose drug to deliver</Link></MessageBox>)
                :(<ListGroup>
                    {cartItems.map((item: CartItem) => (
                        <ListGroup.Item key={item.id}>
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <img src={item.image} alt={item.name} className="img-fluid product-thumbnail"></img>
                                </Col>
                                
                                <Col md={3} >
                                    <div className="d-flex justify-content-center align-items-center"><h4>{item.name}</h4></div>
                                    <div className="d-flex justify-content-center align-items-center">{item.price}₴</div>
                                    
                                    <div className="d-flex justify-content-center align-items-center">
                                    <Button onClick={() => updateCartHandler(item, item.qty - 1)} variant="light" disabled={item.qty === 1}>
                                    <FontAwesomeIcon icon={faCaretDown} /></Button>
                                    <span className="price-cart-span">{item.qty}</span>

                                    <Button onClick={() => updateCartHandler(item, item.qty + 1)} variant="light" disabled={item.qty === item.countInStock}>
                                    <FontAwesomeIcon icon={faCaretUp} /></Button>
                                    </div>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button variant="light" onClick={()=>removeItemHandler(item)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Col>
                                

                            </Row>
                        </ListGroup.Item>))}
                </ListGroup>)}
            </Col>
        </Row>
        <Row>
            <Col className="d-flex justify-content-between align-items-center">
                        
                <h2>Total price: {cartItems.reduce((a, c) => a + c.qty * c.price, 0)}₴</h2>
                <Col md={4}>
                    <Button variant="primary" className="w-100" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                        Submit
                    </Button>
                </Col>
            </Col>
        </Row>
    </div>
)
}