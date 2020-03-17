import React from 'react';
import PropTypes from 'prop-types';

const PasswordTextField = ({ className, id, name, value, onChange }) => (
  <input
    type="password"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
  />
);

PasswordTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
};

PasswordTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default PasswordTextField;
