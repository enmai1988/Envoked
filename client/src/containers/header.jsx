import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, OverlayTrigger, Button, Popover } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { popoverStyle, headerStyle, navStyle } from '../styles';
import HamburgerMenu from '../components/hamburgerMenu.jsx';
import Search from '../components/search.jsx';
import Login from '../components/login.jsx';
import NotificationList from '../components/notificationList.jsx';

class Header extends React.Component {
  render() {
    let { user, toggleSidebar, menu, notifications, videoChatRequestDecision, contactRequestDecision } = this.props;
    let display = null;
    let leftMenu = null;

    const popoverNotification = (
      <Popover id='popover-positioned-bottom' title='Messages' style={popoverStyle}>
        <NotificationList
          notifications={notifications}
          fetchContacts={this.props.fetchContacts}
          contactRequestDecision={contactRequestDecision}
          videoChatRequestDecision={videoChatRequestDecision}
        />
      </Popover>
    );

    if (user.fetched && user.isLoggedIn) {
      display = (
        <Nav pullRight>
          <NavItem>
            <HamburgerMenu menu={menu} toggleSidebar={toggleSidebar}/>
          </NavItem>
        </Nav>);

      leftMenu = (
        <Nav>
          <LinkContainer to='/create'>
            <NavItem>Start a project</NavItem>
          </LinkContainer>
          <LinkContainer to='/myProfile'>
            <NavItem>My projects</NavItem>
          </LinkContainer>
          <OverlayTrigger rootClose={true} trigger='click' placement='bottom' overlay={popoverNotification}>
            <NavItem>My messages <span className='badge'>{notifications.length}</span></NavItem>
          </OverlayTrigger>
        </Nav>
      );
    } else if (!user.fetching && !user.isLoggedIn) {
      display = (
        <Nav pullRight>
          <LinkContainer to='/auth/signup' id='nav_signup_btn'>
            <NavItem>Signup</NavItem>
          </LinkContainer>
          <NavDropdown title="Login" id="login_dropdown">
            <Login />
          </NavDropdown>
        </Nav>);

      leftMenu = (
        <Nav>
          <LinkContainer to='/create'>
            <NavItem>Start a project</NavItem>
          </LinkContainer>
        </Nav>
      );
    }

    return (
      <Navbar style={headerStyle} fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/' style={navStyle.title}>
              <div>Envoked</div>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        {leftMenu}
        {display}
      </Navbar>
    );
  }
}

export default Radium(Header);
