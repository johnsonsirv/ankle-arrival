import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import faker from 'faker';
import { google } from '../config/socialLogin';
import * as dispatchActions from '../actions';

export const SocialLoginPanel = props => {
  const handleSocialLoginSuccess = response => {
    const {
      givenName, familyName, email, googleId: token,
    } = response.profileObj;
    const { idpId: provider } = response.tokenObj;

    const userParams = {
      firstname: givenName,
      lastname: familyName,
      username: faker.internet.userName(),
      email,
      city: 'Remote',
      password: faker.internet.password(),
      provider,
      token,
    };
    props.userFromOauth(userParams);
  };

  const handleSocialLoginFailure = err => {
    console.log(err);
  };

  return (
    <>
      <GoogleLogin
        clientId={google.clientId}
        buttonText="Continue With Google"
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
