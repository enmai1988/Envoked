import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Video from 'twilio-video';

const VideoChat = ({ showVideoChat, disconnectVideoChat }) => (
  <Modal show={showVideoChat} autoFocus={true} bsSize='large'>
    <Modal.Header>
      <Modal.Title>Video Chat</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div id='video-chat-container' className='col-md-12'>
        <div id='participant-window' style={{width: '640px', height: '320px', background: 'rgb(236,236,236)'}}>
          <div id='self-window'></div>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={disconnectVideoChat}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default VideoChat;
