/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as dispatchActions from '../actions';

const mapStateToProps = state => state;

const ProtectedRoute = ({
  getCurrentUser,
  isAuthenticated,
  component: Component,
  render,
  ...rest
}) => {
  useEffect(() => {
    getCurrentUser();
  }, []);
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

ProtectedRoute.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, dispatchActions)(ProtectedRoute);
