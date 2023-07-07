import React from 'react';

//Bootstrap Navbar import
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom'
//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
    <header>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-top">
          <Container>
            <Navbar.Brand href="/App.js">ITe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#">IT Quiz</Nav.Link>
                <Nav.Link href="#">Error</Nav.Link>
                <Nav.Link href="#">Communication</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href='../components/Login.js'>로그인</Nav.Link>
                <Nav.Link href="#">회원가입</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
    )
};

export default Header;