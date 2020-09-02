/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as dispatchActions from '../actions';
import { CurrentUserType } from '../utils/prop-types';

const mapStateToProps = state => state;

export const ProtectedRoute = ({
  getCurrentUser,
  currentUser: { isAuthenticated },
  component: Component,
  render,
  ...rest
}) => {
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

ProtectedRoute.defaultProps = {
  currentUser: {},
};

ProtectedRoute.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(CurrentUserType),
};

export default connect(mapStateToProps, dispatchActions)(ProtectedRoute);
