import React from 'react';
import PropTypes from 'prop-types';

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
  value: '',
};

SocialButton.propTypes = {
  triggerLogin: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default SocialButton;
