import React from 'react';
import css from '../../../public/css/videochat.css';
import Radium from 'radium';
import { videoChatCancel } from '../styles';
import { Modal } from 'react-bootstrap';
import Video from 'twilio-video';

const VideoChat = ({ showVideoChat, disconnectVideoChat }) => (
  <Modal show={showVideoChat} autoFocus={true} dialogClassName='video-chat'>
    <div id='participant-window' style={{width: '640px', height: '480px', backgroundColor: 'rgb(34, 34, 34)', position: 'absolute'}}></div>
    <div id='self-window' style={{position: 'relative', top: '0%', right: '0%'}}></div>
    <a onClick={disconnectVideoChat} style={videoChatCancel}>
      &times;
    </a>
  </Modal>
);

export default Radium(VideoChat);
