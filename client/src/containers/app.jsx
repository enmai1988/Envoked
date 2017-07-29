import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions.js';
import { fetchProjects } from '../actions/projectActions.js';
import { fetchNotifications } from '../actions/notificationActions.js';
import Header from '../components/header.jsx';
import Container from '../components/container.jsx';
import ProjectPage from './projectPage.jsx';
import ProfilePage from '../components/profilePage.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';
import ProjectSubmission from './projectSubmission.jsx';
import PrivateRoute from '../components/privateRoute.jsx';
import Sidebar from './sidebar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSidebar: false };
    this.handleProjectFetching = this.handleProjectFetching.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchNotifications();
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
              <Container
                {...props}
                projects={this.props.projects}
                handleProjectFetching={this.handleProjectFetching}/>
            }/>
            <Route path='/projects/:userId/:project' render={props =>
              <ProjectPage {...props}/>
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
                <ProjectSubmission {...props} user={this.props.user.fetchedUser}/>
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
