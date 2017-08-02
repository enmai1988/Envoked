import React from 'react';
import Radium from 'radium';
import { projectPageMainStyle } from '../styles';

const ContactRequestButton = ({ sendContactRequest, isContact, match }) => {
  let button;

  if (isContact) {
    button = (
      <div style={projectPageMainStyle.addContact.div}>
        <span style={projectPageMainStyle.connected}>
          Connected
        </span>
      </div>
    );
  } else if (isContact === false) {
    button = (
      <div style={projectPageMainStyle.addContact.div} onClick={e => sendContactRequest(e, match.params.userId)}>
        <span style={projectPageMainStyle.addContact.text}>
          <span style={projectPageMainStyle.addContact.plus}>+</span> Add contact
        </span>
      </div>
    );
  }

  return (
    <div>
      {button}
    </div>
  );
};

export default Radium(ContactRequestButton);
