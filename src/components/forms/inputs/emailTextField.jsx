import React from 'react';
import PropTypes from 'prop-types';

const EmailTextField = ({ className, id, name, value, onChange }) => (
  <input
    type="email"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
  />
);

EmailTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
};

EmailTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default EmailTextField;
