import React from 'react';
import PropTypes from 'prop-types';

const RichTextField = ({ className, name, value, onChange, style }) => (
  <textarea
    className={className}
    name={name}
    value={value}
    onChange={onChange}
    style={style}
  />
);

RichTextField.defaultProps = {
  className: '',
  value: ',',
  style: {},
};

RichTextField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default RichTextField;
