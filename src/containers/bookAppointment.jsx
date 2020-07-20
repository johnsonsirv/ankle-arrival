import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Spinner from 'react-spinkit';
import DateInput from '../components/forms/inputs/dateInput';
import TimeInput from '../components/forms/inputs/timeInput';
import RichTextField from '../components/forms/inputs/richTextField';
import ReadOnlyTextField from '../components/forms/inputs/readOnlyTextField';
import * as dispatchActions from '../actions';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => state;

export const BookAppointment = props => {
  const {
    currentUser,
    doctors: { doctors },
    match: { params },
    addNewAppointment,
    appointments: { isFetching, error, newRecord },
  } = props;

  const doctor = doctors.filter(d => d.username === params.username)[0];

  const [booking, setBooking] = useState({
    dateOfAppointment: `${new Date().toLocaleDateString()}`,
    timeOfAppointment: `${new Date().toLocaleTimeString()}`,
    description: '',
    currentUser,
    doctor,
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

    const params = {
      doctor_id: doctor.id,
      description,
      appointment_date: dateOfAppointment,
      appointment_time: timeOfAppointment,
    };

    addNewAppointment({ params, ...currentUser });
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
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {newRecord && <Redirect to="/appointments" />}
      {error && error.invalid && (
        <h4>Could not save this record. Try again.</h4>
      )}
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
          {/* <DateInput
            onChange={handleChange}
            name="dateOfAppointment"
            value={booking.dateOfAppointment}
          /> */}
          {/* <TimeInput
            onChange={handleChange}
            name="timeOfAppointment"
            value={booking.timeOfAppointment}
          /> */}
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
    </>
  );
};

BookAppointment.defaultProps = {
  appointments: null,
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
  appointments: PropTypes.shape({
    isFetching: PropTypes.bool,
    newRecord: PropTypes.bool,
    error: PropTypes.shape({
      invalid: PropTypes.bool,
    }),
  }),
};

export default connect(mapStateToProps, dispatchActions)(BookAppointment);
