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

export default function SigninScreen() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      console.log(data)
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);


    return (
        <Container className="small-container">
            <Helmet>
                <title>SignIn</title>
            </Helmet>
            <h1 className="my-3">SignIn</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlid="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlid="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">SignIn</Button>
                </div>
                <div className="mb-3">
                    New customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create youre account</Link>
                </div>
            </Form>

        </Container>
    )
}