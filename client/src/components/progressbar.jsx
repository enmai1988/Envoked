import React from 'react';

const Progressbar = ({ percentage }) => (
  <div className='progressbar'>
    <div className='progressbar-fill' style={{ width: `${percentage}%` }}></div>
  </div>
);

export default Progressbar;
