import './index.css'
import { sampleProducts } from './data'
import { Navbar, Container, Nav, Row, Col} from 'react-bootstrap';

function App() {

  return (
      <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' className='mb-5'>
          <Container>
            <Navbar.Brand>Drug Delivery</Navbar.Brand>
          </Container>
          <Nav className="m-1" variant='dark'>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar>
        <div className='text-center'>
          <h1> Medicine Delivery app</h1>
        </div>
      </header>
      
      <main>
        <Container className='mt-4'>
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
        </Container>
      </main>

      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
