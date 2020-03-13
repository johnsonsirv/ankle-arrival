import React from 'react';
import PropTypes from 'prop-types';

const RichTextField = ({ className, name, value, onChange }) => (
  <textarea
    className={className}
    name={name}
    value={value}
    onChange={onChange}
  />
);

RichTextField.defaultProps = {
  className: '',
  value: ',',
};

RichTextField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default RichTextField;
