import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { google, facebook, twitter, instagram } from '../config/socialLogin';
import * as dispatchActions from '../actions';
import SocialButton from '../components/forms/inputs/socialButton';

export const SocialLoginPanel = props => {
  const [user, setUser] = useState({});

  const handleSocialLogin = oauthUser => {
    const { firstname, email, lastname } = oauthUser;

    const userParams = {
      firstname,
      lastname,
      username: 'uniq_gen',
      email,
      city: 'Remote',
    };
    console.log(user);
    setUser(user);
    props.authenticateUser(user);
  };

  const handleSocialLoginFailure = err => {
    console.log(err);
  };

  return (
    <>
      <SocialButton
        provider={google.providerName}
        appId={google.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="google-login"
        className=""
      />
      <SocialButton
        provider={facebook.providerName}
        appId={facebook.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="facebook-login"
        className=""
      />
      <SocialButton
        provider={twitter.providerName}
        appId={twitter.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="twitter-login"
        className=""
      />
      <SocialButton
        provider={instagram.providerName}
        appId={instagram.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="instagram-login"
        className=""
      />
    </>
  );
};

SocialLoginPanel.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
};

export default connect(null, dispatchActions)(SocialLoginPanel);
