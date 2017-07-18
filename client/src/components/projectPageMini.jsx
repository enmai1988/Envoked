import React from 'react';

const ProjectPageMini = ({ formData, user }) => {
  if (formData.image) {
    var image = <img src={formData.image}></img>;
  }

  return (
    <div className='container project-preview'>
      <div className='row col-md project-preview-image'>
        {image}
      </div>
      <div className='row col-md project-preview content'>
        <h2>{formData.appName}</h2>
        <h4>{`${user.firstName} ${user.lastName}`}</h4>
        <br></br>
        <span>{formData.description}</span>
      </div>
    </div>
  );
};

export default ProjectPageMini;
