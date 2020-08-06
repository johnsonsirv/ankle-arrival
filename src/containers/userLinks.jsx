import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as dispatchActions from '../actions';
import ProtectedLinks from '../components/protectedLinks';
import { CurrentUserType } from '../utils/prop-types';

const mapStateToProps = state => state;

export const UserLinks = props => {
  const {
    getCurrentUser,
    currentUser: { isAuthenticated },
  } = props;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location = '/';
  };

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <>
      <div className="userLinks">
        {!isAuthenticated && (
          <div className="unProtectedLinks">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        )}
        {isAuthenticated && (
          <div className="protectedLinks">
            <ProtectedLinks />
            <NavLink to="" onClick={handleLogout}>Logout</NavLink>
          </div>
        )}
      </div>
    </>
  );
};

UserLinks.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(CurrentUserType).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(UserLinks);
