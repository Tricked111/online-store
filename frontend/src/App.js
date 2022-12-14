import logo from './logo.svg';
import './App.css';
import data from "./data";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './screens/Home';
import Product from './screens/Product';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store';
import { useContext, useEffect, useState } from 'react'
import Cart from './screens/Cart';
import SigninScreen from './screens/SiginScreen';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import Pay from './screens/Pay';
import ProfileScreen from './screens/ProfileScreen';
import { toast} from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import CreateOrder from './screens/CreateOrder';
import SignupScreen from './screens/SignUpScreen';
import CreateOrderStartScreen from './screens/CreateOrderStartScreen';
import CreateServiceScreen from './screens/CreateServiceScreen';
import CreateProduct from './screens/CreateProduct';
import MyAd from './screens/MyAd';
import ProductEdit from './screens/ProductEdit';
import ServiceEditScreen from './screens/ServiceEditScreen';
import HistoryOrder from './screens/HistoryOrder';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const { cart,userInfo } = state;


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  }
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);


  return (
    <BrowserRouter>
    {/* header */}
    <div className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }>
    <ToastContainer position="top-right" limit={1} />
      <header>
        <Navbar  className="color-nav" variant="dark">
          <Container>
          <Button
                className="color-nav"
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
            <LinkContainer to="/">
              <Navbar.Brand>Marketplace</Navbar.Brand>
            </LinkContainer>
            
            <Nav className="me-auto w-100 justify-content-end">
            <SearchBox />
              <Link to="/cart" className='nav-link'>
              <i className="fa-solid fa-cart-shopping"></i>
              Cart
                {
                  cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a,c) => a + c.quantity,0)}
                    </Badge>
                  )
                }
              </Link>
              <Link to="/Placead" className='nav-link'>
               Place ad
              </Link>
              {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                   
                    <LinkContainer to="/MyAd">
                      <NavDropdown.Item>My Ad</NavDropdown.Item>
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
      <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: "/search",
                    search: `?category=${category}`
                  }}
                  /* className="text-bold side-color" */
                  onClick={() => setSidebarIsOpen(false)}>
                  <Nav.Link className="text-bold side-color">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
      <main>
        <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/placeorder" element={<CreateOrder />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/Placead" element={<CreateOrderStartScreen />} />
              <Route path="/Placead/Service" element={<CreateServiceScreen/>} />
              <Route path="/Placead/Product" element={<CreateProduct/>} />
              <Route
                path="/orderhistory"
                element={<HistoryOrder />}
              ></Route>
              <Route
                path="/MyAd/Product/edit/:id"
                element={
                    <ProductEdit />
                }
              ></Route>
              <Route
                path="/MyAd/Service/edit/:id"
                element={
                    <ServiceEditScreen />
                }
              ></Route>
              <Route path="/MyAd" element={<MyAd/>} />
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<Pay />}></Route>
            </Routes>
        </Container>
      </main>
      {/* footer */}
      <footer>
        <div className='text-center'>ITU</div>
      </footer>


    </div>
    </BrowserRouter>
  );
}

export default App;
