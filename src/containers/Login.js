import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
    return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password,
    })
    .then(function (response) {
        userHasAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        // console.log(localStorage.getItem('token'));
        history.push("/");
        // console.log(response.data)
    })
    .catch(function (error) {
        console.log(error);
        alert("Error Logging In");
    });

    }

    return (
    <div className="Login">
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
        </Button>
        </Form>
    </div>
    );
}