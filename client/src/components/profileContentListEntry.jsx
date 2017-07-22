import React from 'react';
import { Link } from 'react-router-dom';
import Progressbar from './progressbar.jsx';
import { calculatePercentage } from '../../helpers/util';

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
        <p style={{margin: '30px 0'}}>{project.description}</p>
        <div className='row col-md-10'>
          <Progressbar percentage={calculatePercentage(project.currentFunding, project.goal)}/>
          <span style={{padding: '6px 1px', display: 'block'}}>{`${calculatePercentage(project.currentFunding, project.goal)}% funded`}</span>
        </div>
      </div>
    </div>
  </li>
);

export default ProfileContentListEntry;
