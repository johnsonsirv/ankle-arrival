import React from 'react';
import PropTypes from 'prop-types';

const RichTextField = ({ className, name, value }) => (
  <textarea className={className} name={name} value={value} />
);

RichTextField.defaultProps = {
  className: '',
  value: ',',
};

RichTextField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
};

export default RichTextField;
