import React from 'react';
import Login from '../components/Login';

//Bootstrap Navbar
import {
  Container,
  Nav,
  Navbar
}from 'react-bootstrap';

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">ITe</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">IT Quiz</Nav.Link>
            <Nav.Link href="#">Error</Nav.Link>
            <Nav.Link href="#">Communication</Nav.Link>
            <Nav.Link href="/temp">인증test</Nav.Link>
          </Nav>
          <Nav>
            {accessToken ? (<Nav.Link href='/logout'>로그아웃</Nav.Link>) : (<><Nav.Link href="/login">로그인</Nav.Link><Nav.Link href="/signup">회원가입</Nav.Link></>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;