import React from 'react';
import { withRouter, BrowserRouter, Route } from 'react-router';
import Header from './header.jsx';
import Footer from './footer.jsx';
import { styles } from '../styles';

class Layout extends React.Component {
  render() {
    return (
      <div style={styles.layout}>
        <Header />
        <div style={styles.container}>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
