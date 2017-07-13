import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { styles } from '../styles';

class Footer extends React.Component {
  render() {
    return (
      <div style={styles.footer.div} className='footer'>
        <ButtonGroup justified>
          <LinkContainer to='/about' style={styles.footer.button}>
            <Button>About Us</Button>
          </LinkContainer>
          <Button href='https://github.com/TechStarter/TechStarter' style={styles.footer.button}>See Repo</Button>
          <LinkContainer to='/startproject' style={styles.footer.button}>
            <Button >Start a Project</Button>
          </LinkContainer>
        </ButtonGroup>
      </div>
    );
  }
}

export default Footer;
