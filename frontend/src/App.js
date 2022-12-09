import logo from './logo.svg';
import './App.css';
import data from "./data";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'

function App() {
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
          </Container>
        </Navbar>
      </header>
      {/* main */}
      <main>
        <Container>
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
