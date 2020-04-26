import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { google, facebook, instagram } from '../config/socialLogin';
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
    setUser(userParams);
    props.userFromOauth(user);
    console.log(user);
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
        value="Login with Google"
      />
      <SocialButton
        provider={facebook.providerName}
        appId={facebook.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="facebook-login"
        className=""
        value="Login with Facebook"
      />
      {/* <SocialButton
        provider={twitter.providerName}
        appId={twitter.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="twitter-login"
        className=""
        value="Login with Twitter"
      /> */}
      <SocialButton
        provider={instagram.providerName}
        appId={instagram.appId}
        onLoginSuccess={handleSocialLogin}
        onLoinFailure={handleSocialLoginFailure}
        id="instagram-login"
        className=""
        value="Login with Instagram"
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
