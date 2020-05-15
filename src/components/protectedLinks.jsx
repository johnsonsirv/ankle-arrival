import React from 'react';
import { NavLink } from 'react-router-dom';

const ProtectedLinks = () => (
  <div>
    <NavLink to="/doctors">Doctors|</NavLink>
    <NavLink to="/appointments">Appointments|</NavLink>
  </div>
);

export default ProtectedLinks;
