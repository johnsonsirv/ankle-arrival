import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as dispatchActions from '../actions';
import InputTextField from '../components/forms/inputs/inputTextField';
import PasswordTextField from '../components/forms/inputs/passwordTextField';
import Button from '../components/forms/inputs/button';
// import { SocialLoginPanel } from './socialLoginPanel';

const mapStateToProps = state => state;

export const Login = props => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    isValid: false,
  });

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    account[name] = value;
    const error = validateProperty(e.target);
    account.isValid = !error;

    setAccount({ ...account });
    // toastify
    toast.error(error);
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
    userLogin,
    currentUser: { isAuthenticated },
  } = props;
  return (
    <>
      {isAuthenticated && <Redirect to="/doctors" />}
      {userLogin && !userLogin.ok && (
        <Spinner name="three-bounce" fadeIn="none" />
      )}
      <div>{/* <SocialLoginPanel /> */}</div>
      <div>
        <form>
          <InputTextField
            id="username"
            name="username"
            onChange={handleChange}
            value={account.username}
          />

          <PasswordTextField
            name="password"
            onChange={handleChange}
            value={account.password}
          />
          <Button
            onClick={handleLogin}
            value="Login"
            disabled={!account.isValid}
            id="login"
          />
        </form>
      </div>
    </>
  );
};

Login.defaultProps = {
  userLogin: null,
  currentUser: {},
};

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userLogin: PropTypes.shape({
    ok: PropTypes.bool,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }),
};

export default connect(mapStateToProps, dispatchActions)(Login);
