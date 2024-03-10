import './index.css'
import { sampleProducts } from './data'
import { Navbar, Container, Nav, Row, Col} from 'react-bootstrap';

function App() {

  return (
      <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand>Drug Delivery</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/cart">Cart</a>
          </Nav>
        </Navbar>
        Medicine Delivery app
      </header>
      
      <main>
        <Container className='mt-4'>
        <Row>
        {sampleProducts.map((product) => 
        (<Col key={product.id} sm={6} md={3} lg={2}>
          <img src={product.image} alt={product.id} className="product-image"></img>
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
