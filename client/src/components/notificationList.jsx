import React from 'react';
import Radium from 'radium';
import { notificationStyle, notificationListEntryStyle } from '../styles';
import axios from 'axios';

class NotificationList extends React.Component {
  constructor(props) {
    super(props);
    this.acceptContactReq = this.acceptContactReq.bind(this);
    this.declineContactReq = this.declineContactReq.bind(this);
  }

  acceptContactReq(e) {
    e.preventDefault();
    axios.put(`/api/contacts/${e.target.value}`, { status: 'contact' })
      .then(response => {
        this.props.fetchContacts();
      })
      .catch(err => {
        console.log(err);
      });
  }

  declineContactReq(e) {
    e.preventDefault();
    axios.put(`/api/contacts/${e.target.value}`, { status: 'denied' })
      .then(response => {
        this.props.fetchContacts();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ul style={notificationStyle}>
        {this.props.notifications.map((notification, index) => (
          <li key={index} style={notificationListEntryStyle.li}>
            <div style={{float: 'left'}}>
              {`Contact request from ${notification.originator.firstName} ${notification.originator.lastName}`}
            </div>
            <div style={{float: 'left', marginLeft: '10px'}}>
              <button value={notification.originator.id} onClick={this.acceptContactReq} style={notificationListEntryStyle.accept}>Accept</button>
              <button value={notification.originator.id} onClick={this.declineContactReq} style={notificationListEntryStyle.decline}>Decline</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Radium(NotificationList);
