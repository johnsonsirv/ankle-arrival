import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { google } from '../config/socialLogin';
import * as dispatchActions from '../actions';

export const SocialLoginPanel = props => {
  const [user, setUser] = useState({});

  const handleSocialLoginSuccess = response => {
    const { firstname, email, lastname } = response;

    const userParams = {
      firstname,
      lastname,
      username: 'uniq_gen',
      email,
      city: 'Remote',
      password: 'random-password',
    };
    setUser({ ...userParams });
    props.userFromOauth(user);
    console.log(user);
    console.log(response);
  };

  const handleSocialLoginFailure = err => {
    console.log(err);
  };

  return (
    <>
      <GoogleLogin
        clientId={google.clientId}
        buttonText="Login"
        onSuccess={handleSocialLoginSuccess}
        onFailure={handleSocialLoginFailure}
        cookiePolicy={google.cookiePolicy}
      />
    </>
  );
};

SocialLoginPanel.defaultProps = {
  userFromOauth: null,
};

SocialLoginPanel.propTypes = {
  userFromOauth: PropTypes.func,
};

export default connect(null, dispatchActions)(SocialLoginPanel);
