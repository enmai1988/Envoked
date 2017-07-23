import React from 'react';
import { Link } from 'react-router-dom';

const ProjectEntry = ({ project }) => (
  <div className='col-md-4 project-entry'>
    <Link to={`/projects/${project.user.id}/${project.slug}`}>
      <div className='thumbnails'>
        <img src={project.imageURL}></img>
      </div>
    </Link>
    <div className='project-entry-info'>
      <h4>{project.appName}</h4>
    </div>
  </div>
);

export default ProjectEntry;
