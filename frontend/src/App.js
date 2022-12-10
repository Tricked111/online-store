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
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SiginScreen';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';


function App() {
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const { cart,userInfo } = state;


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  }



  return (
    <BrowserRouter>
    {/* header */}
    <div className='d-flex flex-column site-container'>
    <ToastContainer position="top-right" limit={1} />
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
              {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
            </Nav>
          </Container>
        </Navbar>
      </header>
      {/* main */}
      <main>
        <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
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
