import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from '../styles';
import Search from './search.jsx';

const Header = ({ user }) => {
  let displayAuths = null;
  let authActions = [{ name: 'Login', link: '/login'}, { name: 'Signup', link: '/signup' }];
  if (user.fetched && user.fetchedUser) {
    displayAuths = <NavItem href='/logout'>Logout</NavItem>;
  } else if (!user.fetching && !user.fetchedUser) {
    displayAuths = authActions.map((action, index) =>
      <LinkContainer to={action.link} key={index}>
        <NavItem>{action.name}</NavItem>
      </LinkContainer>
    );
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
        <Nav pullRight>
          {displayAuths}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
