import React from 'react';
import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { styles } from '../styles';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Signup from './signup.jsx';
import { Jumbotron } from 'react-bootstrap';

class Layout extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div style={styles.layout}>
          <Header />
          <Jumbotron style={styles.container}>
          </Jumbotron>
          <Route path='/signup' component={Signup}/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default Layout;
