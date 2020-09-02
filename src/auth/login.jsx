/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';
import Joi from 'joi-browser';
import * as dispatchActions from '../actions';
import InputTextField from '../components/forms/inputs/inputTextField';
import Button from '../components/forms/inputs/button';
import SocialLoginPanel from './socialLoginPanel';
import {
  validateProperty,
  validateAllProperty,
  inputTextErrorStyle,
} from '../utils/validation';

const mapStateToProps = state => state;

export const Login = props => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    isValid: false,
    error: {
      username: null,
      password: null,
    },
  });

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const handleChange = e => {
    const { name, value } = e.target;
    account[name] = value;

    const data = { username: account.username, password: account.password };

    const error = validateProperty({ target: e.target, schema });
    account.isValid = validateAllProperty({ data, schema });

    if (error) {
      const errorProperty = error.path[0];
      account.error[errorProperty] = error.message;
    } else {
      account.error = {
        username: null,
        password: null,
      };
    }

    setAccount({ ...account });
  };
  const handleLogin = e => {
    e.preventDefault();
    const { username, password } = account;
    props.authenticateUser({
      username,
      password,
    });
  };

  const { getCurrentUser } = props;
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const {
    currentUser: { isAuthenticated, userLogin },
  } = props;
  const { error } = account;

  return (
    <>
      {isAuthenticated && <Redirect to="/doctors" />}
      {userLogin && userLogin.isFetching && (
        <Spinner name="three-bounce" fadeIn="none" />
      )}
      {userLogin && userLogin.invalid && <h4>Wrong Username or Password</h4>}
      <div className="loginPanel">
        <div>
          <SocialLoginPanel />
        </div>
        <div>
          <form className="loginForm" autoComplete="off">
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <InputTextField
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={account.username}
                style={error && error.username ? inputTextErrorStyle : {}}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <InputTextField
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={account.password}
                style={error && error.password ? inputTextErrorStyle : {}}
              />
            </div>
            <div>
              <Button
                onClick={handleLogin}
                value="Login"
                disabled={!account.isValid}
                id="login"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

Login.defaultProps = {
  currentUser: {},
};

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    userLogin: PropTypes.shape({
      invalid: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
    userAccount: PropTypes.shape({
      created: PropTypes.bool,
    }),
  }),
};

export default connect(mapStateToProps, dispatchActions)(Login);
