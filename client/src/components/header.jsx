import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from '../styles';
import Search from './search.jsx';
import Login from './login.jsx';

const Header = ({ user }) => {
  let displayAuths = null;
  if (user.fetched && user.fetchedUser) {
    displayAuths = <Nav pullRight><NavItem href='/auth/logout'>Logout</NavItem></Nav>;
  } else if (!user.fetching && !user.fetchedUser) {
    displayAuths =
      <Nav pullRight>
        <LinkContainer to='/auth/signup'>
          <NavItem>Signup</NavItem>
        </LinkContainer>
        <NavDropdown title="Login" id="basic-nav-dropdown">
          <Login />
        </NavDropdown>
      </Nav>;
  }

  return (
    <div className='header'>
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
