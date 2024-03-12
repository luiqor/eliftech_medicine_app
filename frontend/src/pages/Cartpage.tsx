import { useContext, useState } from "react"
import { Store } from "../Store"
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap"
import MessageBox from "../components/MessageBox"
import { Link } from "react-router-dom"
import { CartItem } from "../types/Cart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useCreateOrderMutation } from "../hooks/orderHooks"
import LoadingBox from "../components/LoadingBox"

export default function Cartpage() {
    // const navigate = useNavigate()
    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    
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

    const removeItemHandler = (item: CartItem) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: item})
    }

    // const handlePhoneChange = (event) => {
    //     const value = event.target.value
    //     const pattern = /^\+0\d{2}-\d{3}-\d{2}-\d{2}$/
    
    //     if (!pattern.test(value)) {
    //         alert('You\'ve entered not a valid phone number.\n Please, enter a valid phone number in format +0XX-XXX-XX-XX.')
    //         event.target.value = ''
    //     }
    // }

    // const handleEmailChange = (event) => {
    //     const value = event.target.value
    //     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    //     if (!pattern.test(value)) {
    //         alert('You\'ve entered not a valid email.\n Please, enter a valid email');
    //         event.target.value = ''
    //     }
    // }
    const roundPrice = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 
    
    function calculateTotalPrice(cartItems: CartItem[]): number {
        return roundPrice(cartItems.reduce((total, item) => total + item.qty * item.price, 0))
      }
    
    const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation()

    const checkoutHandler = async () => {
        if (!email) {
            alert('Email is required');
            return;
        }
        try {
          const data = await createOrder({
            orderItems: cartItems,
            customerName,
            email,
            phone,
            address,
            totalPrice: calculateTotalPrice(cartItems)
          })
          dispatch({type: 'CLEAR_CART'})
          localStorage.removeItem('cartItems')
          alert('Congratulations! \nYour order has been successfully submitted!')
        //   navigate(`/order/${data.order.id}`)
        }
        catch (error) {
          alert('Sorry, something went wrong')
        }
      }

return(
    <div>
        <div className='text-center'>
          <h1> Shopping Cart</h1>
        </div>
        <Row>
            <Col md={6}>
                <Form.Group controlId="customer-name">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" placeholder="Mykola" required value={customerName} onChange={(e) => setCustomerName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="text" placeholder="example@gmail.com.." required value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="mobile-phone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control type="text" placeholder="+066-123-45-67" required value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="address">
                <Form.Label>Address: </Form.Label>
                <Form.Control type="text" placeholder="Kyiv, Khreschatyk str. 5, ap.10" required value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
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
        <Row className="mt-5">
            <Col className="d-flex justify-content-between align-items-center">
                        
                <h2>Total price: {calculateTotalPrice(cartItems)}₴</h2>
                <Col md={4}>
                    <Button variant="primary" className="w-100" disabled={cartItems.length === 0 || isLoading} onClick={checkoutHandler}>
                        Submit
                    </Button>
                    {isLoading && <LoadingBox></LoadingBox>}
                </Col>
            </Col>
        </Row>
    </div>
)
}