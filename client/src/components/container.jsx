import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { styles } from '../styles';

class Container extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Jumbotron style={styles.container}></Jumbotron>
      </div>
    );
  }
}

export default Container;
