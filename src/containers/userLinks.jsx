import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as dispatchActions from '../actions';
import ProtectedLinks from '../components/protectedLinks';

const mapStateToProps = state => state;

const UserLinks = props => {
  const {
    getCurrentUser,
    currentUser: { isAuthenticated },
  } = props;

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <>
      <div>
        {!isAuthenticated && (
          <>
            <NavLink to="/signup">Sign Up|</NavLink>
            <NavLink to="/login">Login|</NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <NavLink to="/logout">Logout|</NavLink>
            <ProtectedLinks />
          </>
        )}
      </div>
    </>
  );
};

UserLinks.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(UserLinks);
