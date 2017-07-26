import React from 'react';
import css from '../../../public/css/sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div id="sidebar-wrapper">
      <div className='row col-md sidebar-top no-margin'>
        <Link to='/myprofile'>
          <span>My Profile</span>
        </Link>
      </div>
      <div className='row col-md sidebar-main no-margin'>

      </div>
      <div className='row col-md sidebar-bottom no-margin'>

      </div>
    </div>
  );
};

export default Sidebar;
