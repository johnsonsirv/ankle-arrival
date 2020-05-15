import React from 'react';
import { NavLink } from 'react-router-dom';
import UserLinks from '../containers/userLinks';

const NavBar = () => (
  <div>
    <NavLink to="/">Ankle Arrival|</NavLink>
    <NavLink to="/wizard">Instant Diagnosis|</NavLink>
    <UserLinks />
  </div>
);

export default NavBar;
