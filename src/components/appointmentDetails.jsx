import React from 'react';
import PropTypes from 'prop-types';

const AppointmentDetails = props => {
  const {
    appointment: {
      date_of_appointment: dateOfAppointment,
      timeOfAppointment,
      description,
      doctor_firstname: doctorFirstname,
      doctor_lastname: doctorLastname,
    },
  } = props;
  return (
    <>
      <div>
        <div>
          <div id="doctor-name">{`${doctorFirstname} ${doctorLastname}`}</div>
          <div id="description-of-appointment">
            <p>{description}</p>
          </div>
        </div>
        <div>
          <span id="date-of-appointment">{dateOfAppointment}</span>
          <span id="time-of-appointment">{timeOfAppointment}</span>
        </div>
      </div>
    </>
  );
};

AppointmentDetails.propTypes = {
  appointment: PropTypes.shape({
    date_of_appointment: PropTypes.string,
    timeOfAppointment: PropTypes.string,
    description: PropTypes.string,
    doctor_firstname: PropTypes.string,
    doctor_lastname: PropTypes.string,
  }).isRequired,
};
export default AppointmentDetails;
