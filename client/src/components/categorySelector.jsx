import React from 'react';

const CategorySelector = ({ handleInputChange }) => (
  <div className='row project-submission-entry'>
    <div className='col-md-3'>
      <span>Category</span>
    </div>
    <div className='col-md-9 project-submission-select'>
      <select name='category' onChange={handleInputChange}>
        <option value='Future'>Future</option>
        <option value='Education'>Education</option>
        <option value='Healthcare'>Healthcare</option>
        <option value='Design'>Design</option>
        <option value='Business'>Business</option>
        <option value='Environment'>Environment</option>
        <option value='Science'>Science</option>
        <option value='Politics'>Politics</option>
        <option value='Food'>Food</option>
        <option value='Fashion'>Fashion</option>
        <option value='Photography'>Photography</option>
        <option value='Energy'>Energy</option>
        <option value='Fitness'>Fitness</option>

      </select>
    </div>
  </div>
);

export default CategorySelector;