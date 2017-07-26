import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from '../styles';
import HamburgerMenu from './hamburgerMenu.jsx';
import Search from './search.jsx';
import Login from './login.jsx';

const Header = ({ user, toggleSidebar, menu }) => {
  let display = null;
  if (user.fetched && user.isLoggedIn) {
    display =
    <Nav pullRight>
      {/* <NavItem onClick={toggleSidebar}>More</NavItem> */}
      <NavItem>
        <HamburgerMenu menu={menu} toggleSidebar={toggleSidebar}/>
      </NavItem>
    </Nav>;
  } else if (!user.fetching && !user.isLoggedIn) {
    display =
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
    <Navbar style={styles.header} fluid={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/' style={styles.nav.title}>
            <div>Tech Starter</div>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      {display}
    </Navbar>
  );
};

export default Header;
