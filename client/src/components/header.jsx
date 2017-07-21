import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from '../styles';
import Search from './search.jsx';
import Login from './login.jsx';

const Header = ({ user }) => {
  let displayAuths = null;
  if (user.isLoggedIn) {
    displayAuths =
    <Nav pullRight>
      <LinkContainer to='/myprofile'>
        <NavItem>My Profile</NavItem>
      </LinkContainer>
      <NavItem href='/auth/logout'>Logout</NavItem>
    </Nav>;
  } else if (!user.requesting && !user.isLoggedIn) {
    displayAuths =
      <Nav pullRight>
        <LinkContainer to='/auth/signup' id='nav_signup_btn'>
          <NavItem>Signup</NavItem>
        </LinkContainer>
        <NavDropdown title="Login" id="login_dropdown">
          <Login />
        </NavDropdown>
      </Nav>;
  }

  return (
    <div className='row'>
      <Navbar inverse fluid={true} style={styles.header}>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/' style={styles.nav.title}>
              <div>Tech Starter</div>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        {displayAuths}
      </Navbar>
    </div>
  );
};

export default Header;
