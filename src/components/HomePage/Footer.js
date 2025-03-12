import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style.css";
import "./HomePage.css"

const Footer = () => {
  return (
    <footer className="text-white py-3 mt-0 footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 My Profile. All rights reserved.</p>
            <p>Contact us: example@email.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
