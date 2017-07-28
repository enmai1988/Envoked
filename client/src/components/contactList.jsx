import React from 'react';
import css from '../../../public/css/contactList.css';

import ContactListEntry from '../components/contactListEntry.jsx';

const ContactList = ({ contacts, handleVideo }) => (
  <ul className='contact-list'>
    {contacts.map((contact, index) => <ContactListEntry contact={contact} key={index} handleVideo={handleVideo}/>)}
  </ul>
);

export default ContactList;
