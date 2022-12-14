/******************************************************************************
 *                                  ITU
 * 
 *      Authors: Marina Kravchuk (xkravc02)
 * 
 *****************************************************************************/

import { useContext,useReducer,useEffect } from 'react';
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { getError } from '../utils';
import Rating from '../components/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
    switch (action.type) {
      case 'F_REQ':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          ads: action.payload,
          loading: false,
        };
      case 'F_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };




export default function MyAd(){
    
    const navigate = useNavigate();
    
    
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, ads }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
      ads: [],
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch({ type: 'F_REQ' });
          const { data } = await axios.get(`/api/products/user`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          //console.log(data)
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (err) {
          dispatch({
            type: 'F_FAIL',
            payload: getError(err),
          });
        }
        //console.log(ads)
      };
      fetchData();
    }, [userInfo]);

    
    const deleteHandler = async (ad) => {
        if (window.confirm('Are you sure to delete?')) {
          try {
            await axios.delete(`/api/products/${ad._id}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            toast.success('product deleted successfully');
            //dispatch({ type: 'DELETE_SUCCESS' });
          } catch (err) {
            toast.error(getError(error));
            dispatch({
              type: 'DELETE_FAIL',
            });
          }
          navigate('/'); 
        }
      };

    return(
        <div>
            <Helmet>
                <title>
                    My Ad
                </title>
            </Helmet>
            <h1>My Ad</h1>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ):(
            <Row>
                <Col md={9}>
                    {ads.length === 0 ? (
                        <MessageBox>
                            No ad
                        </MessageBox>
                    ):
                    (
                        <ListGroup>
                            {ads.map((ad) =>(
                                <ListGroup.Item key={ad._id}>
                                    <Row className="justify-content-md-center">
                                     <Col md={4}>
                                        <img
                                        src={ad.image}
                                        alt={ad.name}
                                        className="img-fluid rounder img-thumbnail">
                                        </img>{' '}
                                        <Link to={`/product/${ad.slug}`}>{ad.name}</Link>
                                     </Col>
                                     <Col md={4}>Price: ${ad.price}
                                     <Rating rating={ad.rating} numReviews={ad.numReviews} />
                                     </Col>
                                    
                                     <Col md={2}>
                                        <Button 
                                        variant="light" size="lg" onClick={() => {
                                            navigate(`/MyAd/${ad.category}/edit/${ad._id}`);
                                        }}>
                                            <i className="far fa-edit"></i>
                                        </Button>{' '}
                                        
                                        <span>{ad.quantity}</span>{' '}
                                       
                                     
                                     
                                     </Col>
                                     <Col md={2}>
                                        <Button 
                                            variant='light' size="lg"
                                            onClick={() => deleteHandler(ad)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                     </Col>
                                     
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                    }
                </Col>
            </Row>
            )}
    </div>
    )
}