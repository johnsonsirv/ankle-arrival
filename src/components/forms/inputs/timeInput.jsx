import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

const TimeInput = props => {
  const { onChange, name, className, value } = props;

  return (
    <DatePicker
      name={name}
      selected={value}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      className={className}
      placeholderText="choose appointment time"
    />
  );
};

const defaultProps = {
  className: '',
  value: '',
};
const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TimeInput.propTypes = propTypes;
TimeInput.defaultProps = defaultProps;

export default TimeInput;
