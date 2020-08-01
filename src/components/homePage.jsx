import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div>Home</div>
      <div>
        <NavLink to="/login">Get Started |</NavLink>
        <NavLink to="/diagnosis">Free Checkup</NavLink>
      </div>
    </>
  );
};

export default HomePage;
