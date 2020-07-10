import React from 'react';
import { NavLink } from 'react-router-dom';
import UserLinks from '../containers/userLinks';

const NavBar = () => (
  <div>
    <NavLink to="/">Ankle Arrival|</NavLink>
    <NavLink to="/diagnosis">Free checkup|</NavLink>
    <UserLinks />
  </div>
);

export default NavBar;
