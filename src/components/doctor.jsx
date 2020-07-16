import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
// import BookAppointment from '../containers/bookAppointment';
// import ProtectedRoute from '../containers/protectedRoute';

const Doctor = props => {
  const {
    currentUser,
    doctor,
    doctor: { firstname, lastname, city, email, username },
  } = props;
  return (
    <>
      <div>
        <p>{`${firstname} ${lastname}`}</p>
        <p>{city}</p>
        <p>{email}</p>
        <p>{username}</p>
        <Link to={`/book-appointment/${username}`}>Book Appointment</Link>
      </div>
      {/* <Route
        path="/book-appointment/:username"
        render={props => (
          <BookAppointment
            doctor={doctor}
            currentUser={currentUser}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )}
      /> */}
    </>
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
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};

export default Doctor;
