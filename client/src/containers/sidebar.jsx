import React from 'react';
import css from '../../../public/css/sidebar.css';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions/contactActions.js';
import { Link } from 'react-router-dom';
import { debounce } from 'underscore';
import { Modal, Button } from 'react-bootstrap';
import ContactList from '../components/contactList.jsx';
import Video from 'twilio-video';
import axios from 'axios';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      showModal: false
    };

    this.updateInnerHeight = this.updateInnerHeight.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
    this._fetchContacts = debounce(this.fetchContacts, 500);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleVideoConnect = this.handleVideoConnect.bind(this);
    this.handleVideoDisconnect = this.handleVideoDisconnect.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.fetchContacts();
    window.addEventListener('resize', this.updateInnerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateInnerHeight);
  }

  updateInnerHeight() {
    this.setState({ height: window.innerHeight });
  }

  fetchContacts(keyword = '') {
    this.props.fetchContacts({ params: { keyword } });
  }

  handleSearch(e) {
    this._fetchContacts(e.target.value);
  }

  handleVideo(e) {
    this.setState({ showModal: true });

    axios.get('/videocall')
      .then(response => {
        return Video.connect(response.data.token, {name: response.data.identity});
      })
      .then(room => {
        console.log(room);
        room.participants.forEach(this.handleVideoConnect);
        room.on('participantConnected', this.handleVideoConnect);
        room.once('disconnected', error => room.participants.forEach(this.handleVideoDisconnect));
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleVideoConnect(participant) {
    console.log('handleVideoConnect: ', participant);
    const div = document.createElement('div');
    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.on('trackAdded', track => this.trackAdded(div, track));
    participant.tracks.forEach(track => this.trackAdded(div, track));
    participant.on('trackRemoved', this.trackRemoved);

    document.getElementById('video-chat').appendChild(div);
  }

  handleVideoDisconnect() {
    console.log('Participant "%s" disconnected', participant.identity);

    participant.tracks.forEach(trackRemoved);
    document.getElementById(participant.sid).remove();
  }

  trackAdded(div, track) {
    div.appendChild(track.attach());
  }

  trackRemoved(track) {
    track.detach().forEach(element => element.remove());
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div id="sidebar-wrapper">
        <div className='row col-md sidebar-top no-margin'>
          <input type="text"
            className="form-control"
            placeholder="Search contacts"
            onChange={this.handleSearch}
          ></input>
        </div>
        <div className='row col-md sidebar-main no-margin' style={{height: `${this.state.height - 80}px`}}>
          <ContactList contacts={this.props.contacts.content} handleVideo={this.handleVideo}/>
        </div>
        <div className='row col-md sidebar-bottom no-margin'>
          <div>
            <a href='/auth/logout' style={{color: 'white', textDecoration: 'none'}}>Logout</a>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Video Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id='video-chat' style={{width: '100%', height: '100%'}}>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({ contacts: state.contacts });

const mapDispatchToProps = dispatch => ({
  fetchContacts: (option) => dispatch(fetchContacts(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
