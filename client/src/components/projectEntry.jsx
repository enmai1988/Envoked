import React from 'react';
import { Link } from 'react-router-dom';
import { calculatePercentage } from '../../../helpers/util';
import Progressbar from './progressbar.jsx';

const ProjectEntry = ({ project }) => (
  <div className='column project-entry' style={{width: '30%', marginLeft: '2.5%'}}>
    <Link to={`/projects/${project.user.id}/${project.slug}`}>
      <div className='ui fluid image'>
        <img src={project.imageURL}></img>
      </div>
    </Link>
    <div className='project-entry-info'>
      <div style={{height: '40px'}}>
        <h4>{project.appName}</h4>
      </div>
      <div style={{width: '90%', position: 'absolute', bottom: '5%'}}>
        <Progressbar percentage={calculatePercentage(project.currentFunding, project.goal)}/>
        <span style={{display: 'block', margin: '10px 0'}}>{`${calculatePercentage(project.currentFunding, project.goal)}% funded`}</span>
      </div>
    </div>
  </div>
);

export default ProjectEntry;
