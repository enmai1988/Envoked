import React from 'react';
import { strColor } from '../../../helpers/util';

const ContactListEntry = ({ contact, startVideoChat }) => (
  <li className='contact-list-entry' onClick={e => startVideoChat(e, contact)}>
    <div className='row no-margin'>
      <div className='col-md-2 contact-icon'>
        <div style={{background: strColor(`${contact.contacts.firstName[0]}`)}}>
          <span style={{color: 'white', fontSize: '20px'}}>{`${contact.contacts.firstName[0]}`}</span>
        </div>
      </div>
      <div className='col-md-10 contact-info'>
        <div>{`${contact.contacts.firstName} ${contact.contacts.lastName}`}</div>
      </div>
    </div>
  </li>
);

export default ContactListEntry;
