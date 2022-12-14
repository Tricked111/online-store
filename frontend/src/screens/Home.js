/******************************************************************************
 *                                  ITU
 * 
 *      Authors: Daniil Tiurin (xtiuri02)
 * 
 *****************************************************************************/
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from "../components/Product";
import { Helmet } from 'react-helmet-async'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state,action) => {
  switch(action.type){
    case 'F_REQ':
      return {...state,loading: true};
    case 'F_SUC':
      return {...state,products: action.payload, loading: false};
    case 'F_FAIL':
      return {...state,loading: false,error: action.payload};
    default:
      return state;
    }
}


function Home(){
  
  const [{loading,error,products},dispatch] = useReducer(logger(reducer),{
    products: [],
    loading: true,
    error: '',
  });
  //const [products,setProducts] = useState([]);
  useEffect(() =>{
    const fetchData = async () => {

      dispatch({type: 'F_REQ'});
      try{
        const result = await axios.get('/api/products');
        dispatch({type:'F_SUC',payload: result.data });
      }catch(err){
        dispatch({type: 'F_FAIL',payload: err.message});
      }
      const result = await axios.get('/api/products');
      //setProducts(result.data);
    };
    fetchData();
  },[]);
    return <div>
        <Helmet>
          <title>Marketplace</title>
        </Helmet>
        <h1>All products and services</h1>
        <div className="products">

        {loading? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={4} className="mb-3">
              <Product product={product}></Product>
            </Col>
            ))}
          </Row>
        )}
        </div>
    </div>;
}

export default Home;