import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from '../styles';
import Search from './search.jsx';

const Header = (props) => (
  <div className='header'>
    <Navbar inverse fluid={true} style={styles.header}>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/' style={styles.nav.title}>
            <div>Tech Starter</div>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <LinkContainer to='/login'>
          <NavItem>Login</NavItem>
        </LinkContainer>
        <NavItem>Signup</NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default Header;
