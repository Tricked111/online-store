import { Link, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'

export default function SigninScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'
    return (
        <Container className="small-container">
            <Helmet>
                <title>SignIn</title>
            </Helmet>
            <h1 className="my-3">SignIn</h1>
            <Form>
                <Form.Group className="mb-3" controlID="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlID="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
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