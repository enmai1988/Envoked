import React from 'react';
import { BrowserRouter as Router, Link, Route, withRouter, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/header.jsx';
import Container from '../components/container.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';
import { styles } from '../styles';
import { fetchUser } from '../actions/userActions.js';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  handleLoginClick() {
    this.setState({ showLoginModal: true });
  }

  render() {
    console.log(this.props);
    return (
      <Router history={browserHistory}>
        <div style={styles.layout}>
          <Header
            handleLoginClick={this.handleLoginClick.bind(this)}
          />
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


const mapStateToProps = state => {
  return {
    user: fetchUser(state)
  };
};

export default connect(mapStateToProps)(App);
