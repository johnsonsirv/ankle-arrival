import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as dispatchActions from '../actions';
import AppointmentDetails from '../components/appointmentDetails';

const mapStateToProps = state => state;

export const AppointmentList = props => {
  const {
    fetchAppointments,
    getCurrentUser,
    appointments: { appointments: appointmentData, isFetching },
    currentUser,
  } = props;

  useEffect(() => {
    getCurrentUser();
    fetchAppointments(currentUser);
  }, [fetchAppointments, currentUser, getCurrentUser]);

  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {appointmentData.map(appointment => (
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
  appointments: PropTypes.shape({
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
  }).isRequired,
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

export default connect(mapStateToProps, dispatchActions)(AppointmentList);
