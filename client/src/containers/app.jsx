import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions.js';
import { fetchProjects } from '../actions/projectActions.js';
import { fetchNotifications } from '../actions/notificationActions.js';
import Header from '../components/header.jsx';
import LandingPage from '../components/landingPage.jsx';
import ProjectPage from './projectPage.jsx';
import ProfilePage from '../components/profilePage.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';
import ProjectEditor from './projectEditor.jsx';
import PrivateRoute from '../components/privateRoute.jsx';
import Sidebar from './sidebar.jsx';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSidebar: false };
    this.handleProjectFetching = this.handleProjectFetching.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.sendContactRequest = this.sendContactRequest.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser()
      .then(result => {
        if (!result) { throw result; }
        if (result.payload.isLoggedIn) {
          this.props.fetchNotifications();
          this.initSocket(result.payload.user.id);
        }
      })
      .catch(err => {
        console.log('error when fetching user: ', err);
      });
  }

  initSocket(id) {
    this.socket = io({ query: { id } });

    this.socket.on('new notification', () => {
      this.props.fetchNotifications();
    });
  }

  sendContactRequest(e, id) {
    e.preventDefault();
    console.log(id);
    const socket = this.socket;
    socket.emit('contact request', { recipientId: id });
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  handleProjectFetching(origin) {
    this.props.fetchProjects({ params: { origin } });
  }

  render() {
    let sidebarToggle = '';
    let burgerMenu = 'menu';
    if (this.state.showSidebar) {
      sidebarToggle = ' toggled';
      burgerMenu = 'menu change';
    }

    const profilePage = props => (<ProfilePage {...props} user={this.props.user.fetchedUser}/>);

    return (
      <Router history={history}>
        <div id='wrapper' className={`container${sidebarToggle}`}>
          <Header
            user={this.props.user}
            toggleSidebar={this.toggleSidebar}
            menu={burgerMenu}
            notifications={this.props.notifications.content}
          />
          <Switch>
            <Route exact path='/' render={props =>
              <LandingPage
                {...props}
                projects={this.props.projects}
                handleProjectFetching={this.handleProjectFetching}/>
            }/>
            <Route path='/projects/:userId/:project' render={props =>
              <ProjectPage {...props} sendContactRequest={this.sendContactRequest}/>
            }/>
            <Route path='/myProfile' render={props =>
              <ProfilePage {...props} user={this.props.user.fetchedUser}/>
            }/>
            <Route path='/auth/login' component={props =>
              <div className='col align-self-center login_container'>
                <Login {...props}/>
              </div>
            }/>
            <PrivateRoute path='/create'
              spinnerStyle={{top: '50%', marginTop: '-25px'}}
              session={this.props.user}
              component={props =>
                <ProjectEditor {...props} user={this.props.user.fetchedUser}/>
              }
            />
            <Route path='/auth/signup' component={Signup} />
          </Switch>
          {this.props.user.isLoggedIn ?
            <Sidebar user={this.props.user.fetchedUser}/> :
            null
          }
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, projects: state.projects, notifications: state.notifications });

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchProjects: option => dispatch(fetchProjects(option)),
  fetchNotifications: option => dispatch(fetchNotifications(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
