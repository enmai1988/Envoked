import React from 'react';
import css from '../../../public/css/contactList.css';
import ContactListEntry from '../components/contactListEntry.jsx';

const ContactList = ({ contacts, startVideoChat }) => (
  <ul className='contact-list'>
    {contacts.map((contact, index) => <ContactListEntry contact={contact} key={index} startVideoChat={startVideoChat}/>)}
  </ul>
);

export default ContactList;
