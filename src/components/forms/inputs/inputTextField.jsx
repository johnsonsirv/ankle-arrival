import React from 'react';
import PropTypes from 'prop-types';

const InputTextField = ({ className, id, name, value, onChange }) => (
  <input
    type="text"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
  />
);

InputTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
};

InputTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputTextField;
