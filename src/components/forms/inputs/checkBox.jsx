import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ className, id, name, value, onClick, label }) => (
  <>
    <input
      type="checkbox"
      className={className}
      name={name}
      id={id}
      value={value}
      onClick={onClick}
    />
    <label>{label}</label>
  </>
);

CheckBox.defaultProps = {
  name: '',
  id: '',
  className: '',
  value: '',
  label: '',
};

CheckBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default CheckBox;
