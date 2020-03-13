import React from 'react';
import PropTypes from 'prop-types';

const InpuTextField = ({ className, id, name, value, onChange }) => (
  <input
    type="text"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
  />
);

InpuTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
};

InpuTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InpuTextField;
