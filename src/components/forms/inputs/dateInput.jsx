import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const DateInput = props => {
  const { onChange, name, value } = props;
  return <DatePicker inline onChange={onChange} name={name} selected={value} />;
};

const defaultProps = {
  value: '',
};
const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default DateInput;
