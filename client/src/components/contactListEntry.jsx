import React from 'react';

const ContactListEntry = ({ contact }) => (
  <li className='contact-list-entry'>
    <div className='row no-margin'>
      <div className='col-md-2'>
        <img src={contact.avatar}></img>
      </div>
      <div className='col-md-10'>
        <span>{`${contact.firstName} ${contact.lastName}`}</span>
      </div>
    </div>
  </li>
);

export default ContactListEntry;
