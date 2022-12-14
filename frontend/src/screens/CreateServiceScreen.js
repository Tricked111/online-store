/******************************************************************************
 *                                  ITU
 * 
 *      Authors: Daniil Kniazkin (xkniaz00)
 * 
 *****************************************************************************/

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
import axios from "axios";





export default function CreateServiceScreen() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [name, setName] =useState('');
    const [price, setPrice] =useState('');
    const [description, setDescription] =useState('');
    const [contact, setContact] =useState('');
    const [selectedFile, setSelectedFile] = useState('');


    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    
  
    const submitHandler = async (e) => {
      
      if(!selectedFile) { alert("Pick image")}
      
      console.log(selectedFile.name)
      

      e.preventDefault();
      try {
      const { data } = await Axios.post('/api/products/createService', {
        name,
        price,
        description,
        contact,
        image : `/images/${selectedFile.name}`,
    },
    {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }
    );
      console.log(data)
      
      navigate(redirect || '/');
      console.log(localStorage.getItem('myProduct'))
    } catch (err) {
      toast.error(getError(err));
    }
  };


    return (
        <Container className="small-container">
            <Helmet>
                <title>CreateService</title>
            </Helmet>
            <h1 className="my-3">Create Service</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlid="nameService">
                    <Form.Label>Name Service</Form.Label>
                    <Form.Control type="name" required onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="name" required onChange={(e) => setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="name" required onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="contact">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control type="name" required onChange={(e) => setContact(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="imageFile">
                  <Form.Label>Upload File</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit" className="but-color" variant="dark">Confirm</Button>
                </div>
            </Form>

        </Container>
    )
}