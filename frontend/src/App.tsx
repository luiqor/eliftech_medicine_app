import './index.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { Store } from './Store'
import { useContext } from 'react'

function App() {
  const {state: {cart}} = useContext(Store)

  return (
      <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' className='mb-2'>
          <Container>
            <LinkContainer to= '/'>
              <Navbar.Brand>Drug Delivery</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav className="m-1" variant='dark'>
            <Link to="/cart" className='nav-link'>
              Cart
              {cart.cartItems.length > 0 && (
                <span className='badge'>{cart.cartItems.length}</span>
              )}
             </Link>
          </Nav>
        </Navbar>
      </header>
      
      <main>
        <Container className='mt-4'>
          <Outlet/>
        </Container>
      </main>

      <footer className="mt-5">
        <div className='text-center'>Created by @luiqor</div>
      </footer>
    </div>
  )
}

export default App
