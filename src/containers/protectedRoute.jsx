/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as dispatchActions from '../actions';

const mapStateToProps = state => state;

const ProtectedRoute = ({
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
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }),
};

export default connect(mapStateToProps, dispatchActions)(ProtectedRoute);
