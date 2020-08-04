import React from 'react';
import { NavLink } from 'react-router-dom';
import UserLinks from '../containers/userLinks';

const NavBar = () => (
  <div className="navbar">
    <NavLink to="/">Ankle Arrival Logo</NavLink>
    <NavLink to="/diagnosis">Free Checkup</NavLink>
    <a href="https://bit.ly/39ZtQh2" target="_blank" rel="noopener noreferrer">Covid-19</a>
    <UserLinks />

  </div>
);

export default NavBar;
