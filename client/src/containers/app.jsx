import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions.js';
import { fetchProjects } from '../actions/projectActions.js';
import { styles } from '../styles';
import Header from '../components/header.jsx';
import Container from '../components/container.jsx';
import ProjectPage from './projectPage.jsx';
import ProfilePage from '../components/profilePage.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';
import ProjectSubmission from './projectSubmission.jsx';
import PrivateRoute from '../components/privateRoute.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleProjectFetching = this.handleProjectFetching.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  handleProjectFetching(origin) {
    this.props.fetchProjects({ params: { origin } });
  }

  render() {
    return (
      <Router history={history}>
        <div className='container'>
          <Header user={this.props.user}/>
          <Switch>
            <Route exact path='/' render={props =>
              <Container
                {...props}
                projects={this.props.projects}
                handleProjectFetching={this.handleProjectFetching}/>
            }/>
            <Route path='/projects/:userId/:project' component={props =>
              <ProjectPage {...props} user={this.props.user.fetchedUser}/>
            }/>
            <Route path='/myprofile' render={props =>
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
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, projects: state.projects });

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchProjects: (option) => dispatch(fetchProjects(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
