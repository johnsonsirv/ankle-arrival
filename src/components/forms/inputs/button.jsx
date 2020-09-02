import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, id, name, value, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    className={className}
    name={name}
    id={id}
    disabled={disabled}
  >
    {value}
  </button>
);

Button.defaultProps = {
  name: '',
  id: '',
  className: '',
  disabled: false,
};

Button.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
