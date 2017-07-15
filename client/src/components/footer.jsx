import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { styles } from '../styles';

const Footer = () => (
  <div className='text-center footer'>
    <ButtonGroup>
      <LinkContainer to='/about' style={styles.footer.button}>
        <Button>About Us</Button>
      </LinkContainer>
      <Button href='https://github.com/TechStarter/TechStarter' style={styles.footer.button}>See Repo</Button>
      <LinkContainer to='/project' style={styles.footer.button}>
        <Button >Start a Project</Button>
      </LinkContainer>
    </ButtonGroup>
  </div>
);

export default Footer;
