import React from 'react';
import ProfileContentListEntry from './profileContentListEntry.jsx';

const ProfileContentList = ({ projects }) => (
  <ul className='profile-content-list'>
    {projects.map((project, index) => <ProfileContentListEntry project={project} key={index}/>)}
  </ul>
);

export default ProfileContentList;
