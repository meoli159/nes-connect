import React from 'react'
import { Nav,Navbar,Container,Button  } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default function Home() {
  return (
    <Navbar bg="dark" variant='dark'>
  <Container>
    <LinkContainer to='/'>
      <Navbar.Brand >Nes Connect</Navbar.Brand>
    </LinkContainer>   
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Nav>
      <LinkContainer to='/login'>
        <Button>Login</Button>
      </LinkContainer>
      
      <LinkContainer to='/register'>
        <Button className='btn mx-2'>Register</Button>
      </LinkContainer>
    </Nav>
  </Container>
</Navbar>
  )
}
