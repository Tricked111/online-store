import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'
import Axios from "axios";
import { useState, useEffect, useReducer } from 'react';
import React from 'react';
import { Store } from "../Store";
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function CreateProductScreen() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [name, setName] =useState('');
    const [price, setPrice] =useState('');
    const [description, setDescription] =useState('');
    const [contact, setContact] =useState('');
    const [countInStock, setcountInStock] =useState('');
    const [brand, setBrand] =useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
      const { data } = await Axios.post('/api/products/createProduct', {
        name,
        price,
        description,
        contact,
        countInStock,
        brand,
    },
    {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }
    );
      console.log(data)
      
      //ctxDispatch({ type: 'CREATE_PRODUCT', payload: data });
      //localStorage.setItem('myProduct', JSON.stringify(data));
      navigate(redirect || '/');
      console.log(localStorage.getItem('myProduct'))
    } catch (err) {
      toast.error(getError(err));
    }
  };

 /*  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]); */


    return (
        <Container className="small-container">
            <Helmet>
                <title>CreateProduct</title>
            </Helmet>
            <h1 className="my-3">Create Product</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlid="nameProduct">
                    <Form.Label>Name Product</Form.Label>
                    <Form.Control type="name" required onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="price" required onChange={(e) => setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="description" required onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type="countInStock" required onChange={(e) => setcountInStock(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="brand">
                <Form.Label>Brand</Form.Label>
                    <Form.Control type="brand" required onChange={(e) => setBrand(e.target.value)}/>
                </Form.Group>


                <Form.Group className="mb-3" controlid="contact">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control type="contact" required onChange={(e) => setContact(e.target.value)}/>
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">Confirm</Button>
                </div>
            </Form>

        </Container>
    )
}