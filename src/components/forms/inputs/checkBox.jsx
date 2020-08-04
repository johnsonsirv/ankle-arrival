import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ className, id, name, value, onChange, label }) => (
  <>
    <label htmlFor={id}>
      <input
        type="checkbox"
        className={className}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  </>
);

CheckBox.defaultProps = {
  className: '',
  value: '',
  label: '',
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
