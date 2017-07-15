import React from 'react';
import { BrowserRouter as Router, Link, Route, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions.js';
import { fetchProjects } from '../actions/projectActions.js';
import { styles } from '../styles';
import Header from '../components/header.jsx';
import Container from '../components/container.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props);
    return (
      <Router history={browserHistory}>
        <div style={styles.layout}>
          <Header user={this.props.user}/>
          <Route exact path='/' component={() =>
            <Container projects={this.props.projects}/>}
          />
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/signup' component={Signup} />
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, projects: state.projects });

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchProjects: () => dispatch(fetchProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
