import React from 'react';

const ProjectPageMain = ({ formData, user }) => {
  let image = <img src="http://via.placeholder.com/350x197?text=Hello+world!"></img>;
  if (formData.imageURL) {
    image = <img src={formData.imageURL}></img>;
  }

  return (
    <div className='container project-preview'>
      <div className='row col-md project-preview-image'>
        {image}
      </div>
      <div className='row col-md project-preview content'>
        <h2>{formData.appName}</h2>
        <span style={{fontStyle: 'italic', color: 'rgb(130, 130, 130)'}}>{formData.byline}</span>
        <a href={formData.url} style={{display: 'block'}}>{formData.url}</a>
        <br></br>
        <p style={{whiteSpace: 'pre-wrap'}}>{formData.description}</p>
      </div>
    </div>
  );
};

export default ProjectPageMain;
