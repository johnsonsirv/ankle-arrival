import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as dispatchActions from '../actions';
import AppointmentDetails from '../components/appointmentDetails';
import { CurrentUserType } from '../utils/prop-types';

const mapStateToProps = state => state;

export const AppointmentList = props => {
  const {
    fetchAppointments,
    appointments: { appointments: appointmentData, isFetching },
    currentUser,
  } = props;

  useEffect(() => {
    fetchAppointments(currentUser.token);
  }, [fetchAppointments, currentUser]);

  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      <div className="appointmentList">
        {appointmentData.map(appointment => (
          <AppointmentDetails
            appointment={appointment}
            key={appointment.id}
          />
        ))}
      </div>
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
      }).isRequired,
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  fetchAppointments: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(CurrentUserType).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(AppointmentList);
