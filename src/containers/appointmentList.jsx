import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as dispatchActions from '../actions';
import AppointmentDetails from '../components/appointmentDetails';

export const AppointmentList = props => {
  const { appointments, isFetching, currentUser } = props;

  useEffect(() => {
    props.getCurrentUser();
    if (currentUser) {
      props.fetchAppointments(currentUser);
    }
  }, [props]);

  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {appointments.map(appointment => (
        <AppointmentDetails
          appointment={appointment}
          currentUser={currentUser}
          key={appointment.id}
        />
      ))}
    </>
  );
};

AppointmentList.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      dateOfAppointment: PropTypes.string,
      timeOfAppointment: PropTypes.string,
      description: PropTypes.string,
      doctor_firstname: PropTypes.string,
      doctor_lastname: PropTypes.string,
      id: PropTypes.number,
    }).isRequired
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchAppointments: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};

export default connect(null, dispatchActions)(AppointmentList);
