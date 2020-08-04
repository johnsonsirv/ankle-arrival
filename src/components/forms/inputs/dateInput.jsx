import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';

const DateInput = props => {
  const { onChange, name, value } = props;
  return (
    <DatePicker
      inline
      onChange={onChange}
      name={name}
      selected={value}
      minDate={subDays(new Date(), 0)}
    />
  );
};

const defaultProps = {
  value: null,
};
const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default DateInput;
