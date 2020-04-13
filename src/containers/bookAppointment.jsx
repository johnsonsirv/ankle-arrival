import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import moment from 'moment';
import DateInput from '../components/forms/inputs/dateInput';
import TimeInput from '../components/forms/inputs/timeInput';
import RichTextField from '../components/forms/inputs/richTextField';
import ReadOnlyTextField from '../components/forms/inputs/readOnlyTextField';
import * as dispatchActions from '../actions';

export const BookAppointment = props => {
  const {
    currentUser: { firstname, lastname },
    currentUser,
    doctor,
    doctor: { firstname: doctorFirstname, lastname: doctorLastname },
  } = props;

  const [booking, setBooking] = useState({
    dateOfAppointment: null,
    timeOfAppointment: null,
    description: '',
    currentUser,
    doctor,
    isValid: false,
  });

  const schema = {
    description: Joi.string()
      .required()
      .label('Description'),
    dateOfAppointment: Joi.string()
      .required()
      .label('Date of Appointment'),
    timeOfAppointment: Joi.string()
      .required()
      .label('Time of Appointment'),
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      dateOfAppointment,
      timeOfAppointment,
      description,
      doctor,
      currentUser,
    } = booking;
    props.addNewAppointment({
      dateOfAppointment,
      timeOfAppointment,
      description,
      currentUser,
      doctor,
    });

    // redirect here
  };

  const handleChange = e => {
    const { value, name } = e.target;
    booking[name] = value;
    const error = validateProperty(e.target);
    booking.isValid = !error;

    setBooking({ ...booking });
    // toastify
    toast.error(error);
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
        <ReadOnlyTextField
          name="doctor"
          value={`${doctorFirstname} ${doctorLastname}`}
        />
        <ReadOnlyTextField
          name="current-user"
          value={`${firstname} ${lastname}`}
        />
        <RichTextField
          name="description"
          value={booking.description}
          onChange={handleChange}
        />
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
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
  addNewAppointment: PropTypes.func.isRequired,
};

export default connect(null, dispatchActions)(BookAppointment);
