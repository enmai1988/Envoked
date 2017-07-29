import React from 'react';
import Radium from 'radium';
import { notificationStyle, notificationListEntryStyle } from '../styles';

const NotificationList = ({ notifications }) => (
  <ul style={notificationStyle}>
    {notifications.map((notification, index) => (
      <li key={index} style={notificationListEntryStyle}>
        <span style={{display: 'block'}}>You have a friend request from Eric Mai</span>
        <span style={{display: 'block'}}>would you like to accept or decline?</span>
      </li>
    ))}
  </ul>
);

export default Radium(NotificationList);
