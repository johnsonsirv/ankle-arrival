import React from 'react';
import PropTypes from 'prop-types';

const AppointmentDetails = props => {
  const {
    appointment: {
      date_of_appointment: dateOfAppointment,
      time_of_appointment: timeOfAppointment,
      description,
      doctor_firstname: doctorFirstname,
      doctor_lastname: doctorLastname,
    },
  } = props;
  return (
    <div className="appointmentCard">
      <h2 id="doctor-name">{`Dr. ${doctorFirstname} ${doctorLastname}`}</h2>
      <p id="description-of-appointment">
        {description}
      </p>
      <div className="calendar">
        <h4>
          <i>Date: </i>
        </h4>
        <p id="date-of-appointment">{dateOfAppointment}</p>
        <p id="time-of-appointment">{timeOfAppointment}</p>
      </div>
    </div>
  );
};

AppointmentDetails.propTypes = {
  appointment: PropTypes.shape({
    date_of_appointment: PropTypes.string,
    time_of_appointment: PropTypes.string,
    // timeOfAppointment: PropTypes.string,
    description: PropTypes.string,
    doctor_firstname: PropTypes.string,
    doctor_lastname: PropTypes.string,
  }).isRequired,
};
export default AppointmentDetails;
