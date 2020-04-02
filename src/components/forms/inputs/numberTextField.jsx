import React from 'react';
import PropTypes from 'prop-types';

const NumberTextField = ({ className, id, name, value, onChange }) => (
  <input
    type="number"
    className={className}
    name={name}
    id={id}
    value={value}
    onChange={onChange}
  />
);

NumberTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
};

NumberTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default NumberTextField;
