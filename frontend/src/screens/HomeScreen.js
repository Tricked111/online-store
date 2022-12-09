//import data from "../data";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from "../components/Product";

const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state,loading: true};
    case 'FETCH_SUCCUES':
      return {...state,products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state,loading: false,error: action.payload};
    default:
      return state;
    }
}


function HomeScreen(){
  const [{loading,error,products},dispatch] = useReducer(logger(reducer),{
    products: [],
    loading: true,
    error: '',
  });
  //const [products,setProducts] = useState([]);
  useEffect(() =>{
    const fetchData = async () => {

      dispatch({type: 'FETCH_REQUEST'});
      try{
        const result = await axios.get('/api/products');
        dispatch({type:'FETCH_SUCCUES',payload: result.data });
      }catch(err){
        dispatch({type: 'FETCH_FAIL',payload: err.message});
      }
      const result = await axios.get('/api/products');
      //setProducts(result.data);
    };
    fetchData();
  },[]);
    return <div>
        <h1>Featured products</h1>
        <div className="products">

        {loading? (
          <div>loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
            ))}
          </Row>
        )}
        </div>
    </div>;
}

export default HomeScreen;