import React from 'react';
import PropTypes from 'prop-types';

const PasswordTextField = ({ className, id, name, value, onChange, style }) => (
  <input
    type="password"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    style={style}
  />
);

PasswordTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
  style: {},
};

PasswordTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default PasswordTextField;
