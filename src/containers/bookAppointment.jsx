/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';
import DateInput from '../components/forms/inputs/dateInput';
import TimeInput from '../components/forms/inputs/timeInput';
import RichTextField from '../components/forms/inputs/richTextField';
import * as dispatchActions from '../actions';
import InputTextField from '../components/forms/inputs/inputTextField';
import Button from '../components/forms/inputs/button';

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
    dateOfAppointment: null,
    timeOfAppointment: null,
    description: '',
    currentUser,
    doctor,
    isValid: false,
    error: {
      description: null,
    },
  });

  const schema = {
    description: Joi.string().required().label('Description'),
    dateOfAppointment: Joi.date().required().label('Date of Appointment'),
    timeOfAppointment: Joi.date().required().label('Time of Appointment'),
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error: validationError } = Joi.validate(obj, subSchema);
    return validationError ? validationError.details[0] : null;
  };

  const validateAllProperty = () => {
    const { description, dateOfAppointment, timeOfAppointment } = booking;

    return description && dateOfAppointment && timeOfAppointment;
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
      appointment_date: new Date(dateOfAppointment).toDateString(),
      appointment_time: new Date(timeOfAppointment).toTimeString(),
    };

    addNewAppointment({ params, ...currentUser });
  };

  const handleChange = e => {
    const { value, name } = e.target;
    booking[name] = value;
    const validationError = validateProperty(e.target);
    booking.isValid = validateAllProperty();

    if (validationError) {
      const errorProperty = validationError.path[0];
      booking.error[errorProperty] = validationError.message;
    } else {
      booking.error = {
        description: null,
      };
    }
    setBooking({ ...booking });
  };

  const handleSelectDate = date => {
    booking.dateOfAppointment = date;
    booking.isValid = validateAllProperty();

    setBooking({ ...booking });
  };

  const handleSelectTime = time => {
    booking.timeOfAppointment = time;
    booking.isValid = validateAllProperty();

    setBooking({ ...booking });
  };

  const inputTextErrorStyle = {
    outlineWidth: '2px',
    outlineColor: 'red',
    outlineStyle: 'solid',
  };

  const { error: validationError } = booking;

  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {newRecord && <Redirect to="/appointments" />}
      {error && error.invalid && (
        <h4>Could not save this record. Try again.</h4>
      )}
      <div className="bookAppointmentPanel">
        <form className="bookAppointmentForm" autoComplete="off">
          <div>
            <label htmlFor="doctor">Doctor&apos;s Name</label>
            <br />
            <InputTextField
              type="text"
              id="doctor"
              name="doctor"
              value={`Dr. ${doctor.firstname} ${doctor.lastname}`}
              onChange={() => {}}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="current-user">Your name</label>
            <br />
            <InputTextField
              type="text"
              id="current-user"
              name="current-user"
              value={`${currentUser.username}`}
              onChange={() => {}}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="description">Tell me a bit about your symptoms</label>
            <br />
            <RichTextField
              name="description"
              value={booking.description}
              onChange={handleChange}
              style={
                validationError && validationError.description
                  ? inputTextErrorStyle
                  : {}
              }
            />
          </div>
          <div>
            <DateInput
              onChange={handleSelectDate}
              name="dateOfAppointment"
              value={booking.dateOfAppointment}
            />
          </div>
          <div>
            <TimeInput
              onChange={handleSelectTime}
              name="timeOfAppointment"
              value={booking.timeOfAppointment}
            />
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              value="Submit"
              id="book-appointment"
              disabled={!booking.isValid}
            />
          </div>
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
