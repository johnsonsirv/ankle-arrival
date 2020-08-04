import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Doctor = props => {
  const {
    doctor: { firstname, lastname, city, email, username },
  } = props;
  return (
    <div className="doctorCard">
      <h2>{`Dr. ${firstname} ${lastname}`}</h2>
      <p>
        <i>Location: </i>
        {city}
      </p>
      <p>
        <i>{email}</i>
      </p>
      <Link to={`/book-appointment/${username}`}>Schedule Appointment</Link>
    </div>
  );
};

Doctor.propTypes = {
  doctor: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default Doctor;
