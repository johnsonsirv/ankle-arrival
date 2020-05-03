import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => (
  <div>
    <NavLink to="/">Ankle Arrival|</NavLink>
    <NavLink to="/doctors">Doctors|</NavLink>
    <NavLink to="/appointments">Appointments|</NavLink>
    <NavLink to="/wizard">Instant Diagnosis|</NavLink>
    <NavLink to="/signup">Sign Up|</NavLink>
    <NavLink to="/login">Login|</NavLink>
  </div>
);

export default NavBar;
