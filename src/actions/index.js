import axios from 'axios';
import config from '../config.json';
import {
  RECEIVE_DOCTORS,
  REQUEST_DOCTORS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  NEW_APPOINTMENT_SUCCESS,
} from './actionTypes';

// configure apiEndpoint to prod
const apiEndPoint = config.demoApiEndPoint;

export const requestDoctors = () => ({
  type: REQUEST_DOCTORS,
});

export const receiveDoctors = response => ({
  type: RECEIVE_DOCTORS,
  payload: response.map(data => JSON.parse(data)),
});

export const fetchDoctors = token => async dispatch => {
  const header = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/doctors`;

  dispatch(requestDoctors());
  return axios
    .get(url, { headers: header })
    .then(response => dispatch(receiveDoctors(response)));
};

// set localastorage refactor to global
export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
});

export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: currentUser,
});

export const addNewAppointmentSuccess = response => ({
  type: NEW_APPOINTMENT_SUCCESS,
  payload: JSON.parse(response),
});

export const addNewAppointmentFailure = response => ({
  type: NEW_APPOINTMENT_SUCCESS,
  payload: JSON.parse(response),
});

export const addNewAppointment = data => async dispatch => {
  const { token } = data.currentUser;
  const header = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/appointments`;
  return axios
    .post(url, {}, { headers: header })
    .then(response => dispatch(addNewAppointmentSuccess(response)))
    .catch(ex => dispatch(addNewAppointmentFailure(ex)));
};
