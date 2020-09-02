import React from 'react';
import PropTypes from 'prop-types';

const InputTextField = ({
  type,
  className,
  id,
  name,
  value,
  onChange,
  style,
}) => (
  <input
    type={type}
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
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default InputTextField;
