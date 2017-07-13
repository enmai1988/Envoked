import React from 'react';
import Search from './search.jsx';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { styles } from '../styles';

class Header extends React.Component {
  render() {
    console.log('rendering header');
    return (
      <Navbar inverse style={styles.header}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/' style={styles.nav.a}>Tech Starter</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem href='/login'>Login</NavItem>
          <NavItem href='/signup'>Signup</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
