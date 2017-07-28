import React from 'react';
import { strColor } from '../../../helpers/util';

const ContactListEntry = ({ contact, handleVideo }) => (
  <li className='contact-list-entry' onClick={handleVideo}>
    <div className='row no-margin'>
      <div className='col-md-2 contact-icon'>
        <div style={{background: strColor(`${contact.firstName[0]}`)}}>
          <span style={{color: 'white', fontSize: '20px'}}>{`${contact.firstName[0]}`}</span>
        </div>
      </div>
      <div className='col-md-10 contact-info'>
        <div>{`${contact.firstName} ${contact.lastName}`}</div>
      </div>
    </div>
  </li>
);

export default ContactListEntry;
