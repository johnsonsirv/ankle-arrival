import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import DateInput from '../components/forms/inputs/dateInput';
import TimeInput from '../components/forms/inputs/timeInput';
import ReadOnlyTextField from '../components/forms/inputs/readOnlyTextField';
import * as dispatchActions from '../actions';

export const BookAppointment = props => {
  const {
    currentUser,
    doctor,
    doctor: { firstname, lastname },
  } = props;

  const [booking, setBooking] = useState({
    dateOfAppointment: null,
    timeOfAppointment: null,
    currentUser,
    doctor,
    isValid: false,
  });

  const validate = () => {
    const { dateOfAppointment, timeOfAppointment } = booking;
    let status = false;
    if (dateOfAppointment !== null && timeOfAppointment !== null) {
      status = true;
    }
    booking.isValid = status;
    setBooking({ ...booking });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      dateOfAppointment,
      timeOfAppointment,
      doctor,
      currentUser,
    } = booking;
    props.addNewAppointment({
      dateOfAppointment,
      timeOfAppointment,
      description: 'I have a diesease',
      currentUser,
      doctor,
    });
  };

  const handleChange = e => {
    const { value, name } = e.target;
    booking[name] = value;

    validate();
  };

  useEffect(() => {
    setBooking({
      currentUser,
      doctor,
    });
  }, [doctor, currentUser]);

  return (
    <div>
      <form>
        <ReadOnlyTextField name="doctor" value={`${firstname} ${lastname}`} />
        <ReadOnlyTextField name="current-user" value="" />
        <DateInput
          onChange={handleChange}
          name="dateOfAppointment"
          value={booking.dateOfAppointment}
        />
        <TimeInput
          onChange={handleChange}
          name="timeOfAppointment"
          value={booking.timeOfAppointment}
        />
        <button
          type="button"
          onClick={handleSubmit}
          id="book-appointment"
          disabled={!booking.isValid}
        >
          Save Appointment
        </button>
      </form>
    </div>
  );
};

BookAppointment.propTypes = {
  doctor: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  addNewAppointment: PropTypes.func.isRequired,
};

export default connect(null, dispatchActions)(BookAppointment);
