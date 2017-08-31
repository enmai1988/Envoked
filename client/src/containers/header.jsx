import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
// import { Navbar, Nav, NavItem, NavDropdown, OverlayTrigger, Button, Popover } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Menu, Popup, Button } from 'semantic-ui-react';
// import { popoverStyle, headerStyle, navStyle } from '../styles';
import HamburgerMenu from '../components/hamburgerMenu.jsx';
import Search from '../components/search.jsx';
import Login from '../components/login.jsx';
import NotificationList from '../components/notificationList.jsx';

class Header extends React.Component {
  render() {
    let userMenu, burgerMenu;
    let { user, toggleSidebar, menu, notifications, videoChatRequestDecision, contactRequestDecision } = this.props;

    const popoverNotification = (
      <Popup
        trigger={<Button color='red' icon='flask' content='Activate doomsday device' />}
        content={<Button color='green' content='Confirm the launch' />}
        on='click'
        position='bottom center'
      />
      // <Popover id='popover-positioned-bottom' title='Messages' style={popoverStyle}>
      //   <NotificationList
      //     notifications={notifications}
      //     fetchContacts={this.props.fetchContacts}
      //     contactRequestDecision={contactRequestDecision}
      //     videoChatRequestDecision={videoChatRequestDecision}
      //   />
      // </Popover>
    );
    if (user.fetched && user.isLoggedIn) {
      userMenu = (
        <Menu.Menu position='left'>
          <Menu.Item as={Link} to='/create'>Start a project</Menu.Item>
          <Menu.Item as={Link} to='/myProfile'>My projects</Menu.Item>
        </Menu.Menu>
      );

      burgerMenu = (
        <Menu.Menu position='right'>
          <Menu.Item><HamburgerMenu menu={menu} toggleSidebar={toggleSidebar} /></Menu.Item>
        </Menu.Menu>
      );
    } else if (!user.fetching && !user.isLoggedIn) {
      userMenu = (
        <Menu.Menu position='left'>
          <Menu.Item>Explore Projects</Menu.Item>
        </Menu.Menu>
      );

      burgerMenu = (
        <Menu.Menu position='right'>
          <Menu.Item href='/auth/facebook'>Signin</Menu.Item>
        </Menu.Menu>
      );
    }

    // if (user.fetched && user.isLoggedIn) {
    //   display = (
    //     <Nav pullRight>
    //       <NavItem>
    //         <HamburgerMenu menu={menu} toggleSidebar={toggleSidebar}/>
    //       </NavItem>
    //     </Nav>);

    //   leftMenu = (
    //     <Nav>
    //       <LinkContainer to='/create'>
    //         <NavItem>Start a project</NavItem>
    //       </LinkContainer>
    //       <LinkContainer to='/myProfile'>
    //         <NavItem>My projects</NavItem>
    //       </LinkContainer>
    //       <OverlayTrigger rootClose={true} trigger='click' placement='bottom' overlay={popoverNotification}>
    //         <NavItem>My messages <span className='badge'>{notifications.length}</span></NavItem>
    //       </OverlayTrigger>
    //     </Nav>
    //   );
    // } else if (!user.fetching && !user.isLoggedIn) {
    //   display = (
    //     <Nav pullRight>
    //       <LinkContainer to='/auth/signup' id='nav_signup_btn'>
    //         <NavItem>Signup</NavItem>
    //       </LinkContainer>
    //       <NavDropdown title="Login" id="login_dropdown">
    //         <Login />
    //       </NavDropdown>
    //     </Nav>);

    //   leftMenu = (
    //     <Nav>
    //       <LinkContainer to='/create'>
    //         <NavItem>Start a project</NavItem>
    //       </LinkContainer>
    //     </Nav>
    //   );
    // }

    return (
      <Menu fluid>
        <Menu.Item as={Link} to='/' header>Envoked</Menu.Item>
        {userMenu}
        {burgerMenu}
      </Menu>
      // <Navbar style={headerStyle} fluid={true}>
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <LinkContainer to='/' style={navStyle.title}>
      //         <div>Envoked</div>
      //       </LinkContainer>
      //     </Navbar.Brand>
      //   </Navbar.Header>
      //   {leftMenu}
      //   {display}
      // </Navbar>
    );
  }
}

export default Header;

// export default Radium(Header);
