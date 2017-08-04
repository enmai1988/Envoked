import React from 'react';
import Radium from 'radium';
import { Button } from 'react-bootstrap';
import { projectPageMainStyle } from '../styles';

const ContactRequestButton = ({ sendContactRequest, isContact, match }) => {
  let button;

  if (isContact) {
    button = (
      <Button bsStyle='danger' bsSize="xsmall">Connected</Button>
    );
  } else if (isContact === false) {
    button = (
      <Button bsStyle='danger' bsSize="xsmall">Add to contact</Button>
    );
  }

  return (
    <div>
      {button}
    </div>
  );
};

export default ContactRequestButton;
