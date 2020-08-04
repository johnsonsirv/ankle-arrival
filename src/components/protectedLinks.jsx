import React from 'react';
import { NavLink } from 'react-router-dom';

const ProtectedLinks = () => (
  <>
    <NavLink to="/doctors">Doctors</NavLink>
    <NavLink to="/appointments">Appointments</NavLink>
    <NavLink to="/logout">Logout</NavLink>
  </>
);

export default ProtectedLinks;
