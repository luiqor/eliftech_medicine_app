import './index.css'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function App() {

  return (
      <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' className='mb-2'>
          <Container>
            <Navbar.Brand>Drug Delivery</Navbar.Brand>
          </Container>
          <Nav className="m-1" variant='dark'>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar>
      </header>
      
      <main>
        <Container className='mt-4'>
          <Outlet/>
        </Container>
      </main>

      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
