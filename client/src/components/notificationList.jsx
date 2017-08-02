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

  acceptContactReq(e, notification) {
    axios.put(`/api/contacts/${e.target.value}`, { status: 'contact' })
      .then(response => {
        this.props.fetchContacts();
        this.props.markNotificationAsRead(notification);
      })
      .catch(err => {
        console.log(err);
      });
  }

  declineContactReq(e, notification) {
    axios.put(`/api/contacts/${e.target.value}`, { status: 'denied' })
      .then(response => {
        this.props.fetchContacts();
        this.props.markNotificationAsRead(notification);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ul style={notificationStyle}>
        {this.props.notifications.map((notification, index) => {
          if (notification.type === 'contact request') {
            return (
              <li key={index} style={notificationListEntryStyle.li}>
                <div style={{float: 'left'}}>
                  {`Contact request from ${notification.originator.firstName} ${notification.originator.lastName}`}
                </div>
                <div style={{float: 'left', marginLeft: '10px'}}>
                  <button
                    value={notification.originator.id}
                    onClick={e => this.acceptContactReq(e, notification)}
                    style={notificationListEntryStyle.accept}
                  >
                    Accept
                  </button>
                  <button
                    value={notification.originator.id}
                    onClick={e => this.declineContactReq(e, notification)}
                    style={notificationListEntryStyle.decline}
                  >
                    Decline
                  </button>
                </div>
              </li>
            );
          } else if (notification.type === 'video chat request') {
            return (
              <li key={index} style={notificationListEntryStyle.li}>
                <div style={{float: 'left'}}>
                  {`Video chat request from ${notification.originator.firstName} ${notification.originator.lastName}`}
                </div>
                <div style={{float: 'left', marginLeft: '10px'}}>
                  <button value={notification.originator.id} onClick={() => this.props.accepVideoChatRequest(notification)} style={notificationListEntryStyle.accept}>Accept</button>
                  <button value={notification.originator.id} style={notificationListEntryStyle.decline}>Decline</button>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

export default Radium(NotificationList);
