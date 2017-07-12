import React from 'react';
import AppBar from 'material-ui/AppBar';
import { styles } from '../styles';

class Header extends React.Component {
  render() {
    return (
      <AppBar
        title='Tech Starter'
        style={styles.header}
      />
    );
  }
}

export default Header;
