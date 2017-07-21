import React from 'react';
import { Link } from 'react-router-dom';

const ProfileContentListEntry = ({ project }) => (
  <li className='list-entry'>
    <div className='container list-entry-container'>
      <Link to={`/project/${project.id}`}>
        <div className='col-md-5 list-image-container'>
          <img src={project.imageURL}></img>
        </div>
      </Link>
      <div className='col-md-7 list-entry-content-container'>
        <Link to={`/project/${project.id}`}>
          <h3>{project.appName}</h3>
        </Link>
        <p>{project.description}</p>
      </div>
    </div>
  </li>
);

export default ProfileContentListEntry;
