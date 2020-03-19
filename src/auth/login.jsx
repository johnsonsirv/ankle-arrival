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

const mapStateToProps = state => state;

export const Login = props => {
  const [account, setAccount] = useState({
    username: null,
    password: null,
    isValid: false,
  });

  const schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password'),
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

  useEffect(() => {
    props.getCurrentUser();
  }, []);

  const { userAccount } = props;
  const { isAuthenticated } = props;
  return (
    // render social login section here
    <>
      {isAuthenticated && <Redirect to="/doctors" />}
      {!userAccount.created && <Spinner name="three-bounce" fadeIn="none" />}
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
  isAuthenticated: false,
};

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userAccount: PropTypes.shape({
    created: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(Login);
