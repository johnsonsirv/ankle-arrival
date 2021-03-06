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
  validateAllProperty,
  validateProperty,
  inputTextErrorStyle,
} from '../utils/validation';

const mapStateToProps = state => state;

export const Signup = props => {
  const [account, setAccount] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    city: 'Remote',
    isValid: false,
    error: {
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      password: null,
    },
  });

  const schema = {
    firstname: Joi.string().required().label('Firstname'),
    lastname: Joi.string().required().label('Lastname'),
    email: Joi.string().email().required().label('Email'),
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const handleChange = e => {
    const { name, value } = e.target;
    account[name] = value;
    const data = {
      firstname: account.firstname,
      lastname: account.lastname,
      email: account.email,
      username: account.username,
      password: account.password,
    };

    const error = validateProperty({ target: e.target, schema });
    account.isValid = validateAllProperty({ data, schema });

    if (error) {
      const errorProperty = error.path[0];
      account.error[errorProperty] = error.message;
    } else {
      account.error = {
        firstname: null,
        lastname: null,
        email: null,
        username: null,
        password: null,
      };
    }

    setAccount({ ...account });
  };
  const handleSignUp = e => {
    e.preventDefault();
    const { firstname, lastname, username, password, email, city } = account;
    props.createUserAccount({
      firstname,
      lastname,
      username,
      password,
      email,
      city,
    });
  };

  const { getCurrentUser } = props;
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const {
    currentUser: { userAccount, isAuthenticated },
  } = props;

  const { error } = account;

  return (
    // render social login section here
    <>
      {isAuthenticated && <Redirect to="/doctors" />}
      {userAccount && userAccount.isFetching && (
        <Spinner name="three-bounce" fadeIn="none" />
      )}
      {userAccount && userAccount.invalid && (
        <h4>Something went wrong. Try again.</h4>
      )}
      <div className="signUpPanel">
        <div>
          <SocialLoginPanel />
        </div>
        <div>
          <form className="signUpForm" autoComplete="off">
            <div>
              <label htmlFor="firstname">Firstname</label>
              <br />
              <InputTextField
                type="text"
                id="firstname"
                name="firstname"
                onChange={handleChange}
                value={account.firstname}
                style={error && error.firstname ? inputTextErrorStyle : {}}
              />
            </div>
            <div>
              <label htmlFor="lastname">Lastname</label>
              <br />
              <InputTextField
                type="text"
                id="lastname"
                name="lastname"
                onChange={handleChange}
                value={account.lastname}
                style={error && error.lastname ? inputTextErrorStyle : {}}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <InputTextField
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={account.email}
                style={error && error.email ? inputTextErrorStyle : {}}
              />
            </div>
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
                onClick={handleSignUp}
                value="Sign Up"
                disabled={!account.isValid}
                id="signup"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

Signup.defaultProps = {
  currentUser: {},
};

Signup.propTypes = {
  createUserAccount: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    userLogin: PropTypes.shape({
      ok: PropTypes.bool,
    }),
    userAccount: PropTypes.shape({
      invalid: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
  }),
};

export default connect(mapStateToProps, dispatchActions)(Signup);
