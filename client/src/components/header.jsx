import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from '../styles';
import Search from './search.jsx';

class Header extends React.Component {
  render() {
    console.log('rendering header');
    return (
      <div className='header'>
        <Navbar inverse fluid={true} style={styles.header}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/' style={styles.nav.a}>Tech Starter</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <LinkContainer to='/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to='/signup'>
              <NavItem>Signup</NavItem>
            </LinkContainer>
          </Nav>
      </Navbar>
    </div>
    );
  }
}

export default Header;
