import React from 'react';
import css from '../../../public/css/sidebar.css';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions/contactActions.js';
import { Link } from 'react-router-dom';
import { debounce } from 'underscore';
import ContactList from '../components/contactList.jsx';
import Video from 'twilio-video';
import axios from 'axios';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: window.innerHeight };

    this.updateInnerHeight = this.updateInnerHeight.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
    this._fetchContacts = debounce(this.fetchContacts, 500);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleVideoConnect = this.handleVideoConnect.bind(this);
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
    axios.get('/videocall')
      .then(response => {
        return Video.connect(response.data.token, {name: response.data.identity});
      })
      .then(room => {
        console.log(room);
        room.participants.forEach(this.handleVideoConnect);
        room.on('participantConnected', this.handleVideoConnect);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleVideoConnect(participant) {
    const div = document.createElement('div');
    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.on('trackAdded', track => this.trackAdded(div, track));
    participant.tracks.forEach(track => this.trackAdded(div, track));
    participant.on('trackRemoved', this.trackRemoved);

    document.getElementById('wrapper').appendChild(div);
  }

  trackAdded(div, track) {
    div.appendChild(track.attach());
  }

  trackRemoved(track) {
    track.detach().forEach(element => element.remove());
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
      </div>
    );
  }
}

const mapStateToProps = state => ({ contacts: state.contacts });

const mapDispatchToProps = dispatch => ({
  fetchContacts: (option) => dispatch(fetchContacts(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
