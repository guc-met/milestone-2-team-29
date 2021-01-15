import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import axios from 'axios';
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";
import "./App.css";

// const apiUrl = 'http://localhost:5000';
// axios.interceptors.request.use(
//   config => {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = ['*'];
//     const token = localStorage.getItem('access_token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

function App() {
  // const storedJwt = localStorage.getItem('access_token');
  // const [jwt, setJwt] = useState(storedJwt || null);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  function handleLogout() {
    axios.post('http://localhost:5000/api/logout')
    .then(function (response) {
      userHasAuthenticated(false);
      history.push("/login");
    });
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            GUC Staff
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;