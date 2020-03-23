import React from 'react';
import PropTypes from 'prop-types';
import SocialLogin from 'react-social-login';

const SocialButton = props => {
  const { triggerLogin, value, name, className, id } = props;
  return (
    <button
      type="button"
      onClick={triggerLogin}
      id={id}
      className={className}
      name={name}
    >
      {value}
    </button>
  );
};

SocialButton.defaultProps = {
  name: '',
  className: '',
  id: '',
};

SocialButton.propTypes = {
  triggerLogin: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default SocialLogin(SocialButton);
