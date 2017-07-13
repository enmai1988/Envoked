import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { styles } from '../styles';

class Search extends React.Component {
  render() {
    return (
      <form style={styles.searchDiv}>
        <FormControl type='text' placeholder='Search'/>
      </form>
    );
  }
}

export default Search;
