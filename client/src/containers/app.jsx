import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions.js';
import { fetchProjects } from '../actions/projectActions.js';
import { fetchNotifications } from '../actions/notificationActions.js';
import { updateVieoChatInfo } from '../actions/videoChatActions.js';
import { fetchContacts } from '../actions/contactActions.js';
import Header from './header.jsx';
import LandingPage from '../components/landingPage.jsx';
import ProjectPage from './projectPage.jsx';
import ProfilePage from '../components/profilePage.jsx';
import Footer from '../components/footer.jsx';
import Signup from '../components/signup.jsx';
import Login from '../components/login.jsx';
import ProjectEditor from './projectEditor.jsx';
import PrivateRoute from '../components/privateRoute.jsx';
import Sidebar from './sidebar.jsx';
import VideoChat from '../components/videoChat.jsx';
import io from 'socket.io-client';
import TwilioVideo from 'twilio-video';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      showVideoChat: false
    };

    this.handleProjectFetching = this.handleProjectFetching.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.sendContactRequest = this.sendContactRequest.bind(this);
    this.contactRequestDecision = this.contactRequestDecision.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.startVideoChat = this.startVideoChat.bind(this);
    this.videoChatRequestDecision = this.videoChatRequestDecision.bind(this);
    this.disconnectVideoChat = this.disconnectVideoChat.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser()
      .then(result => {
        if (!result) { throw result; }
        if (result.payload.isLoggedIn) {
          this.props.fetchNotifications();
          this.initSocket(result.payload.user.id);
        }
      })
      .catch(err => {
        console.log('error when fetching user: ', err);
      });
  }

  contactRequestDecision(e, notification) {
    this.socket.emit('contact request decision', {
      contactsId: notification.originatorId,
      userId: notification.recipientId,
      status: e.target.value
    });

    this.markNotificationAsRead(notification);
  }

  initSocket(id) {
    this.socket = io({ query: { id } });

    this.socket.on('update notification', this.props.fetchNotifications);

    this.socket.on('update contact', this.props.fetchContacts);

    this.socket.on('video chat token', videoChatInfo => {
      this.videoChatInfo = videoChatInfo;
      this.initVideoChatRoom(videoChatInfo);
    });

    this.socket.on('video chat request', data => {
      this.props.updateVieoChatInfo(data);
    });
  }

  sendContactRequest(e, id) {
    e.preventDefault();
    console.log(id);
    const socket = this.socket;
    socket.emit('contact request', { recipientId: id });
  }

  markNotificationAsRead(notifications) {
    this.socket.emit('mark notifications as read', notifications);
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  handleProjectFetching(origin) {
    this.props.fetchProjects({ params: { origin } });
  }

  startVideoChat(e, invitee) {
    this.setState({ showVideoChat: true });
    this.socket.emit('start video chat', {
      inviter: this.props.user.fetchedUser,
      invitee: invitee.contacts
    });
  }

  initVideoChatRoom(chatInfo) {
    TwilioVideo.connect(chatInfo.token, { name: this.props.user.fetchedUser.id })
      .then(room => {
        room.on('participantConnected', participant => {
          console.log('Participant "%s" connected', participant.identity);

          participant.on('trackAdded', track => {
            document.getElementById('participant-window').appendChild(track.attach());
          });

          participant.on('trackRemoved', track => {
            track.detach().forEach(el => el.remove());
          });
        });

        room.on('participantDisconnected', participant => {
          console.log('Participant disconnected', participant.identity);

          participant.tracks.forEach(track => {
            track.detach().forEach(el => el.remove());
          });
        });

        room.on('disconnected', room => {
          room.localParticipant.tracks.forEach(track => {
            track.detach().forEach(el => el.remove());
          });
        });

        this.room = room;
        this.createLocalTracks();
      })
      .catch(err => {
        console.log('failed to init video chat room: ', err);
      });
  }

  createLocalTracks() {
    return TwilioVideo.createLocalTracks({ video: { width: 120 }, audio: true })
      .then(localTracks => {
        localTracks.forEach(track => {
          document.getElementById('self-window').appendChild(track.attach());
        });
      });
  }

  videoChatRequestDecision(e, notification) {
    this.markNotificationAsRead(notification);
    if (e.target.value === 'decline') {
      return;
    }
    this.setState({ showVideoChat: true });
    this.socket.emit('accept video chat request', this.props.user.fetchedUser);

    this.socket.on('join video chat', data => {
      TwilioVideo.connect(data.token, { name: this.props.videoChatInfo.inviter.id })
        .then(room => {
          room.participants.forEach(participant => {
            participant.on('trackAdded', track => {
              document.getElementById('participant-window').appendChild(track.attach());
            });

            participant.on('trackRemoved', track => {
              track.detach().forEach(el => el.remove());
            });
          });

          room.on('participantConnected', participant => {
            console.log('Participant "%s" connected', participant.identity);

            participant.on('trackAdded', track => {
              document.getElementById('participant-window').appendChild(track.attach());
            });

            participant.on('trackRemoved', track => {
              track.detach().forEach(el => el.remove());
            });
          });

          room.on('participantDisconnected', participant => {
            console.log('Participant disconnected', participant.identity);
          });

          room.on('disconnected', room => {
            room.localParticipant.tracks.forEach(track => {
              track.detach().forEach(el => el.remove());
            });
          });

          this.room = room;

          this.createLocalTracks();
        });
    });
  }

  disconnectVideoChat() {
    this.room.disconnect();
    this.setState({ showVideoChat: false });
  }

  render() {
    let sidebarToggle = '';
    let burgerMenu = 'menu';
    if (this.state.showSidebar) {
      sidebarToggle = ' toggled';
      burgerMenu = 'menu change';
    }

    return (
      <Router history={history}>
        <div id='wrapper' className={`container${sidebarToggle}`}>
          <Header
            user={this.props.user}
            toggleSidebar={this.toggleSidebar}
            menu={burgerMenu}
            notifications={this.props.notifications.content}
            contactRequestDecision={this.contactRequestDecision}
            videoChatRequestDecision={this.videoChatRequestDecision}
          />
          <Switch>
            <Route exact path='/' render={props =>
              <LandingPage
                {...props}
                projects={this.props.projects}
                handleProjectFetching={this.handleProjectFetching}/>
            }/>
            <Route path='/projects/:userId/:project' render={props =>
              <ProjectPage
                {...props}
                sendContactRequest={this.sendContactRequest}
                user={this.props.user}
              />
            }/>
            <Route path='/myProfile' render={props =>
              <ProfilePage {...props} user={this.props.user.fetchedUser}/>
            }/>
            <Route path='/auth/login' component={props =>
              <div className='col align-self-center login_container'>
                <Login {...props}/>
              </div>
            }/>
            <PrivateRoute path='/create'
              spinnerStyle={{top: '50%', marginTop: '-25px'}}
              session={this.props.user}
              component={props =>
                <ProjectEditor {...props} user={this.props.user.fetchedUser}/>
              }
            />
            <Route path='/auth/signup' component={Signup} />
          </Switch>
          {
            this.props.user.isLoggedIn ?
              <Sidebar user={this.props.user.fetchedUser} startVideoChat={this.startVideoChat}/> :
              null
          }
          <VideoChat showVideoChat={this.state.showVideoChat} disconnectVideoChat={this.disconnectVideoChat}/>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, projects: state.projects, notifications: state.notifications, videoChatInfo: state.videoChatInfo });

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchProjects: option => dispatch(fetchProjects(option)),
  fetchNotifications: option => dispatch(fetchNotifications(option)),
  updateVieoChatInfo: info => dispatch(updateVieoChatInfo(info)),
  fetchContacts: (option) => dispatch(fetchContacts(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
