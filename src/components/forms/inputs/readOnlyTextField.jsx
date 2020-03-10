import React from 'react';
import PropTypes from 'prop-types';

const ReadOnlyTextField = ({ className, id, name, value }) => (
  <input
    type="text"
    className={className}
    name={name}
    id={id}
    value={`${value}`}
    readOnly
  />
);

ReadOnlyTextField.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
};

ReadOnlyTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
};

export default ReadOnlyTextField;
