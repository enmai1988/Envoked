import React from 'react';

const ProjectPageMain = ({ project, user, match }) => {
  let containerClass = 'container project-preview';
  let image = <img src="http://via.placeholder.com/350x197?text=Hello+world!"></img>;
  if (project.imageURL) { image = <img src={project.imageURL}></img>; }
  if (match.params.project) { containerClass = 'container project-main'; }

  return (
    <div className={containerClass}>
      <div className='row col-md project-image'>
        {image}
      </div>
      <div className='row col-md project-content'>
        <h2>{project.appName}</h2>
        <span>{project.blurb}</span>
        <a href={project.url}>{project.url}</a>
        <br></br>
        <p className='project-description'>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectPageMain;
