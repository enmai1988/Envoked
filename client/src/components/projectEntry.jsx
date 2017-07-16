import React from 'react';
import { Link } from 'react-router-dom';

const ProjectEntry = ({ project }) => (
  <div className='col-md-4 project_entry'>
<<<<<<< HEAD
    <Link to={`/project/${project.id}`}>
      <div className='thumbnails'>
        <img src={`/assets/pageres/${project.images[0].small}`}></img>
      </div>
    </Link>
=======
    <div className='thumbnails'>
      <img src={`/assets/pageres/${project.images[0].url}`}></img>
    </div>
>>>>>>> create user with social network login
    <div className='project_entry_info'>
      <h4>{project.name}</h4>
    </div>
  </div>
);

export default ProjectEntry;
