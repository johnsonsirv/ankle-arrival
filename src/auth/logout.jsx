import React from 'react';

const Logout = () => {
  localStorage.removeItem('currentUser');
  window.location = '/';
  return <></>;
};

export default Logout;
