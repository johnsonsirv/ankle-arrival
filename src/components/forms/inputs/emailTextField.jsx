import React from 'react';
import PropTypes from 'prop-types';

const EmailTextField = ({ className, id, name, value, onChange, style }) => (
  <input
    type="email"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    style={style}
  />
);

EmailTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
  style: {},
};

EmailTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default EmailTextField;
