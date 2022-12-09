import logo from './logo.svg';
import './App.css';
import data from "./data";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store';
import { useContext } from 'react'


function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
    {/* header */}
    <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Marketplace</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className='nav-link'>
                Cart
                {
                  cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a,c) => a + c.quantity,0)}
                    </Badge>
                  )
                }
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      {/* main */}
      <main>
        <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
        </Container>
      </main>
      {/* footer */}
      <footer>
        <div className='text-center'>TODO</div>
      </footer>


    </div>
    </BrowserRouter>
  );
}

export default App;
