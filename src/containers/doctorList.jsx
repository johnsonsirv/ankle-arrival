import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Doctor from '../components/doctor';
import * as dispatchActions from '../actions';

const mapStateToProps = state => state;

export const DoctorList = props => {
  const { doctors, isFetching } = props;

  useEffect(() => {
    // i need the user token
    const token = 'xxx.yyy.zzz';
    props.fetchDoctors(token);
  }, [props]);
  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {doctors.map(doctor => (
        <Doctor doctor={doctor} key={doctor.id} />
      ))}
    </>
  );
};

DoctorList.propTypes = {
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
  fetchDoctors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, dispatchActions)(DoctorList);
