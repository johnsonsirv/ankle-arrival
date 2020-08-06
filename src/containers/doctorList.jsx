import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Doctor from '../components/doctor';
import * as dispatchActions from '../actions';
import { DoctorType, CurrentUserType } from '../utils/prop-types';

const mapStateToProps = state => state;

export const DoctorList = props => {
  const {
    currentUser,
    doctors: { doctors: doctorData, isFetching },
    fetchDoctors,
  } = props;

  useEffect(() => {
    fetchDoctors(currentUser.token);
  }, [fetchDoctors, currentUser]);

  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      <div className="doctorList">
        {doctorData.map(doctor => (
          <Doctor doctor={doctor} key={doctor.id} />
        ))}
      </div>
    </>
  );
};

DoctorList.propTypes = {
  doctors: PropTypes.shape({
    doctors: PropTypes.arrayOf(DoctorType).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,

  fetchDoctors: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(CurrentUserType).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(DoctorList);
