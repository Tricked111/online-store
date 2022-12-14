/******************************************************************************
 *                                  ITU
 * 
 *      Authors: Marina Kravchuk (xkravc02)
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

export default function CreateOrderStartScreen() {
  
  const navigate = useNavigate();
  
  const [category, setCategory] =useState('');
  
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(category)
    try {
      navigate(`${category}`);
    } catch (err) {
      toast.error(getError(err));
    }
  };


    return (
        <Container className="small-container">
            <Helmet>
                <title>Place ad</title>
            </Helmet>
            <h1 className="my-3">Place ad</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlid="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select type="category" required onChange={(e) => setCategory(e.target.value)}>
                        <option>Select one</option>
                        <option value="Service">Service</option>
                        <option value="Product">Product</option>

                    </Form.Select>
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit" className="but-color" variant="dark">Next</Button>
                </div>
            </Form>

        </Container>
    )
}