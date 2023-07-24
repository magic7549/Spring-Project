import React from 'react';

//Bootstrap Navbar
import {
  Container,
  Nav,
  Navbar
}from 'react-bootstrap';

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

//css
import '../css/Header.css';

const Header = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">ITe</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ItQuiz">IT Quiz</Nav.Link>
            <Nav.Link href="/error">Error</Nav.Link>
            <Nav.Link href="/post">Post</Nav.Link>
            <Nav.Link href="/temp">인증test</Nav.Link>
          </Nav>
          <Nav>
            {accessToken ? (<Nav.Link href='/logout'>로그아웃</Nav.Link>) : (<><Nav.Link href="/login">로그인</Nav.Link>
            <Nav.Link href="/signup">회원가입</Nav.Link></>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;