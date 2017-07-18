import React from 'react';
import { Link } from 'react-router-dom';

const ProjectEntry = ({ project }) => (
  <div className='col-md-4 project_entry'>
    <Link to={`/project/${project.id}`}>
      <div className='thumbnails'>
        <img src={`/assets/screenshots/${project.images[0].small}`}></img>
      </div>
    </Link>
    <div className='project_entry_info'>
      <h4>{project.appName}</h4>
    </div>
  </div>
);

export default ProjectEntry;
