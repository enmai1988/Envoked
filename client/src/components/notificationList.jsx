import React from 'react';
import Radium from 'radium';
import { notificationStyle, notificationListEntryStyle } from '../styles';
import axios from 'axios';

class NotificationList extends React.Component {
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
                    value='contact'
                    onClick={e => this.props.contactRequestDecision(e, notification)}
                    style={notificationListEntryStyle.accept}
                  >
                    Accept
                  </button>
                  <button
                    value='decline'
                    onClick={e => this.props.contactRequestDecision(e, notification)}
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
                  <button value='accept' onClick={e => this.props.videoChatRequestDecision(e, notification)} style={notificationListEntryStyle.accept}>Accept</button>
                  <button value='decline' onClick={e => this.props.videoChatRequestDecision(e, notification)} style={notificationListEntryStyle.decline}>Decline</button>
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
