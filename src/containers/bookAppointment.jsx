import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import DateInput from '../components/forms/inputs/dateInput';
import TimeInput from '../components/forms/inputs/timeInput';
import RichTextField from '../components/forms/inputs/richTextField';
import ReadOnlyTextField from '../components/forms/inputs/readOnlyTextField';
import * as dispatchActions from '../actions';

const mapStateToProps = state => state;

export const BookAppointment = ({
  currentUser,
  doctors: { doctors },
  match,
  addNewAppointment,
}) => {
  const { username } = match.params;
  const doctor = doctors.filter(d => d.username === username)[0];

  const [booking, setBooking] = useState({
    dateOfAppointment: null,
    timeOfAppointment: null,
    description: '',
    // currentUser,
    // doctor,
    isValid: false,
  });

  const schema = {
    description: Joi.string().required().label('Description'),
    dateOfAppointment: Joi.string().required().label('Date of Appointment'),
    timeOfAppointment: Joi.string().required().label('Time of Appointment'),
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

    addNewAppointment({
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
    if (!booking.isValid) toast.error(error);
  };

  return (
    <div>
      <form>
        <ReadOnlyTextField
          name="doctor"
          value={`${doctor.firstname} ${doctor.lastname}`}
        />
        <ReadOnlyTextField
          name="current-user"
          value={`${currentUser.username}`}
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
  doctors: PropTypes.shape({
    doctors: PropTypes.arrayOf(
      PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        city: PropTypes.string,
        email: PropTypes.string,
        username: PropTypes.string,
        id: PropTypes.number,
      }).isRequired,
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,

  currentUser: PropTypes.shape({
    username: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  addNewAppointment: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(BookAppointment);
