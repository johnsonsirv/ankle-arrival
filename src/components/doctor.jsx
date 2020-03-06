import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Doctor = props => {
  const {
    doctor: {
      firstname, lastname, city, email, username, id,
    },
  } = props;
  return (
    <div>
      <p>{`${firstname} ${lastname}`}</p>
      <p>{city}</p>
      <p>{email}</p>
      <p>{username}</p>
      <Link to={`/book-apointment/${id}`}>Book Appointment</Link>
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
