import React from 'react';
import PropTypes from 'prop-types';

const InputTextField = ({ className, id, name, value, onChange, style }) => (
  <input
    type="text"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    style={style}
  />
);

InputTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
  style: {},
};

InputTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default InputTextField;
