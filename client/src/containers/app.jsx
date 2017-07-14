import React from 'react';
import { BrowserRouter as Router, Link, Route, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/header.jsx';
import Container from '../components/container.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';
import { styles } from '../styles';
import { fetchUser } from '../actions/userActions.js';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div style={styles.layout}>
          <Header />
            <Route exact path='/' component={() =>
              <Container />}
            />
            <Route path='/login' component={Login} />
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ currUser: state.user.currUser });

const mapDispatchToProps = dispatch => ({ fetchUser: () => dispatch(fetchUser()) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
