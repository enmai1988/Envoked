import React from 'react';

const ProjectFormEntry = ({ entry, handleInputChange, inputValue }) => (
  <div className='row project-submission-entry'>
    <div className='col-md-3'>
      <span>{entry.title}</span>
    </div>
    <div className='col-md-9 project-submission-input'>
      <textarea name={entry.name} value={inputValue} onChange={handleInputChange}></textarea>
    </div>
  </div>
);


export default ProjectFormEntry;
