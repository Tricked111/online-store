import {Navigate, useNavigate, useParams} from "react-router-dom"
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from "../components/Rating";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { useContext } from 'react'
import { Store } from "../Store";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
const reducer = (state,action) => {
    switch(action.type){
      case 'FETCH_REQUEST':
        return {...state,loading: true};
      case 'FETCH_SUCCUES':
        return {...state,product: action.payload, loading: false};
      case 'FETCH_FAIL':
        return {...state,loading: false,error: action.payload};
      case 'USERINFO_SUCCUES':
        return {...state,userInfo : action.payload};
      default:
        return state;
      }
  }



function ProductScreen (){
    const navigate = useNavigate();
    const params = useParams();
    const {slug} = params;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [{loading,error,product,userInfo},dispatch] = useReducer((reducer),{
        product: [],
        loading: true,
        error: '',
        userInfo: [],
      });
      
      useEffect(() =>{
        const fetchData = async () => {
    
          dispatch({type: 'FETCH_REQUEST'});
          try{
            const result = await axios.get(`/api/products/slug/${slug}`);
            
            if(result.data.user){
               const userInfo =  await axios.get(`/api/users/${result.data.user}`); 
               dispatch({ type: 'USERINFO_SUCCUES', payload: userInfo.data })       
            }
            dispatch({type:'FETCH_SUCCUES',payload: result.data });
          }catch(err){
            dispatch({type: 'FETCH_FAIL',payload: getError(err)});
          }
        };
        fetchData();
      },[slug]);


    const {state,dispatch: ctxDispatch} = useContext(Store);

    const{cart} = state;

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        console.log(data.countInStock,quantity)

        if(data.countInStock < quantity) {
            window.alert("Sorr. Product is out of stock");
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: {...product,quantity},
        });

        navigate('/cart');        
    };

    return loading? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      )
        :(<div>
            <Row>
                <Col md={6}>
                    <img
                        className="img-large"
                        src={product.image}
                        alt={product.name}
                    ></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                            <title>{product.name}</title>
                            </Helmet>
                        </ListGroup.Item>
                        
                            <h1>{product.name}</h1>
                        
                        
                        <ListGroup.Item variant="flush">
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}>
                            </Rating>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>
                    
                        <ListGroup.Item>
                            Description:
                            <p>{product.description}</p>
                        </ListGroup.Item>
                        {
                            product.contact && (
                                <ListGroup.Item>
                            Contact:
                            <p>{product.contact}</p>
                        </ListGroup.Item>
                            )
                        }
                        <ListGroup.Item>
                            <Button variant="primary" onClick={handleShow}>
                                About Seller
                            </Button>
                            <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                            <Modal.Title>Info</Modal.Title>
                            </Modal.Header>
                            <Row>
                            <Col md={6}>
                                <img 
                                src={userInfo.image}
                                alt={userInfo.image}
                                className="img-fluid rounder "></img>
                            </Col>
                            <Col md={5}>
                            {userInfo.name && (<Modal.Body>Name: {userInfo.name}</Modal.Body>)}
                            {userInfo.link && (<Modal.Body>Link: <Link to={`${userInfo.link}`}>{userInfo.link}</Link></Modal.Body>)}
                            {userInfo.email && (<Modal.Body>Email: {userInfo.email}</Modal.Body>)}
                            </Col>
                            </Row>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            
                            </Modal.Footer>
                        </Modal>
                        </ListGroup.Item>
                    

                    </ListGroup>
                    
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                        {product.countInStock>0 || product.category === 'Service'?
                                        <Badge bg="success">Available</Badge>   
                                        :
                                        <Badge bg="danger">Unavailable</Badge>   
                                    }</Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button onClick={addToCartHandler} variant="primary">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                                )}
                                

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>);
}

export default ProductScreen