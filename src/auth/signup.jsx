import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as dispatchActions from '../actions';
import InputTextField from '../components/forms/inputs/inputTextField';
import EmailTextField from '../components/forms/inputs/emailTextField';
import PasswordTextField from '../components/forms/inputs/passwordTextField';
import Button from '../components/forms/inputs/button';

const mapStateToProps = state => state;

export const Signup = props => {
  const [account, setAccount] = useState({
    firstname: null,
    lastname: null,
    email: null,
    username: null,
    password: null,
    city: 'Remote',
    isValid: false,
  });

  const schema = {
    firstname: Joi.string().required().label('Firstname'),
    lastname: Joi.string().required().label('Lastname'),
    email: Joi.string().email().required().label('Email'),
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
    toast.error(error);
  };
  const handleClick = e => {
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

  useEffect(() => {
    props.getCurrentUser();
  });

  const { currentUser: { userAccount, isAuthenticated } } = props;
  return (
    // render social login section here
    <>
      {isAuthenticated && <Redirect to="/doctors" />}
      {!userAccount.created && <Spinner name="three-bounce" fadeIn="none" />}
      <div>
        <form>
          <InputTextField
            id="firstname"
            name="firstname"
            onChange={handleChange}
            value={account.firstname}
          />
          <InputTextField
            id="lastname"
            name="lastname"
            onChange={handleChange}
            value={account.lastname}
          />
          <InputTextField
            id="username"
            name="username"
            onChange={handleChange}
            value={account.username}
          />
          <EmailTextField
            name="email"
            onChange={handleChange}
            value={account.email}
          />
          <PasswordTextField
            name="password"
            onChange={handleChange}
            value={account.password}
          />
          <Button
            onClick={handleClick}
            value="Sign Up"
            disabled={!account.isValid}
            id="signup"
          />
        </form>
      </div>
    </>
  );
};

Signup.defaultProps = {
  currentUser: {}
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
      created: PropTypes.bool,
    })
  }),
};

export default connect(mapStateToProps, dispatchActions)(Signup);
