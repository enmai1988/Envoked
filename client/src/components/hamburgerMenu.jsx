import React from 'react';
import css from '../../../public/css/menu.css';

const HamburgerMenu = ({ menu, toggleSidebar }) => (
  <div className={menu} onClick={toggleSidebar}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
  </div>
);

export default HamburgerMenu;
