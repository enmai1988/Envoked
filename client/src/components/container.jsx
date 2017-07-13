import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { styles } from '../styles';

class Container extends React.Component {
  render() {
    return (
      <div className='main'>
        <Jumbotron style={styles.showcase}></Jumbotron>
      </div>
    );
  }
}

export default Container;
