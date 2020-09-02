import PropTypes from 'prop-types';

export const DoctorType = PropTypes.shape({
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  city: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.number,
}).isRequired;

export const CurrentUserType = {
  username: PropTypes.string,
  token: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};
