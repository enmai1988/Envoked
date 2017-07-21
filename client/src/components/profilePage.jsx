import React from 'react';
import ProfileContent from '../containers/profileContent.jsx';

const ProfilePage = ({ user }) => (
  <div className='container profile-container'>
    <div className='row profile-row'>
      <div className='col-md-4 col-md-offset-4 profile-top'>
        <div className='col-md-2'>
          <img src={user.avatar}></img>
        </div>
        <div className='col-md-10'>
          <span>Good morning,</span>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </div>
    </div>
    <div className='row profile-row'>
      <ProfileContent />
    </div>
  </div>
);

export default ProfilePage;
