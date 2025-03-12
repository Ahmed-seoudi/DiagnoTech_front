
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style.css";
import "./HomePage.css"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('jwt');
  setIsLoggedIn(!!token);  

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [localStorage.getItem('jwt')]);  


  const handleLogout = async () => {
    setIsLoggedIn(false);  
    localStorage.removeItem('jwt');  

    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      alert("Logged out successfully!"); 
      navigate("/"); 
    } catch (error) {
      alert(error.message || "An error occurred.");
    }
  };

  return (
    <Navbar expand="lg" className="navbar-custom py-2" bg="primary" variant="dark">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/">
          <img
            src="/img/logo.png" 
            alt="Logo"
            width="50"
            height="50"
            className="logo-img"
          />
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links & Search Bar */}

          <Form className="d-flex ms-3">
            <div className="search-container">
              <FormControl 
                type="text" 
                placeholder="Search..." 
                className="search-input" 
                aria-label="Search"
              />
              <Button variant="outline-light" className="search-btn">
                <i className="bi bi-search" aria-hidden="true"></i>
              </Button>
            </div>
          </Form>


        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="active">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/doctor">Dr.Profile</Nav.Link>

            {/* Show Login and Signup if not logged in */}
            {!isLoggedIn ? (
              <>
                <Nav.Link onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                  Login
                </Nav.Link>
              </>
            ) : (
              // Show Logout if logged in
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            )}
          </Nav>

          {/* Search Bar */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
