import React from 'react';
import ProfileContent from '../containers/profileContent.jsx';

const ProfilePage = ({ user }) => (
  <div className='container profile-container no-margin'>
    <div className='row profile-row'>
      <div className='col-md-6 col-md-offset-3 profile-top'>
        <div className='col-md'>
          <span>Welcome back, {`${user.firstName} ${user.lastName}`}</span>
        </div>
      </div>
    </div>
    <div className='row profile-row no-margin'>
      <ProfileContent />
    </div>
  </div>
);

export default ProfilePage;
