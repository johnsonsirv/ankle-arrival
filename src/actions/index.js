import axios from 'axios';
import config from '../config/config.json';
import {
  RECEIVE_DOCTORS,
  REQUEST_DOCTORS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REQUEST_APPOINTMENTS,
  RECEIVE_APPOINTMENTS,
  NEW_APPOINTMENT_SUCCESS,
  NEW_APPOINTMENT_FAILURE,
  REQUEST_NEW_APPOINTMENT,
  REQUEST_SIGNUP,
  SIGNUP_FAILURE,
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

// 2. appointments
export const addNewAppointmentSuccess = response => ({
  type: NEW_APPOINTMENT_SUCCESS,
  payload: JSON.parse(response),
});

export const addNewAppointmentFailure = response => ({
  type: NEW_APPOINTMENT_FAILURE,
  payload: JSON.parse(response),
});

export const requestNewAppointment = () => ({
  type: REQUEST_NEW_APPOINTMENT,
});

export const addNewAppointment = data => async dispatch => {
  const { token } = data.currentUser;
  const header = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/appointments`;
  dispatch(requestNewAppointment());
  return axios
    .post(url, {}, { headers: header })
    .then(response => dispatch(addNewAppointmentSuccess(response)))
    .catch(ex => dispatch(addNewAppointmentFailure(ex)));
};

export const requestAppointments = () => ({
  type: REQUEST_APPOINTMENTS,
});

export const receiveAppointments = response => ({
  type: RECEIVE_APPOINTMENTS,
  payload: response.map(data => JSON.parse(data)),
});

export const fetchAppointments = user => async dispatch => {
  const { id, token } = user;
  const header = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/${id}/appointments`;

  dispatch(requestAppointments());
  return axios
    .get(url, { headers: header })
    .then(response => dispatch(receiveAppointments(response)));
};

// 3. auth
const getUserFromLocalStorage = () =>
  localStorage.getItem('currentUser') || null;
const syncToLocalStorage = data =>
  localStorage.setItem('currentUser', JSON.stringify(data));

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
  payload: getUserFromLocalStorage(),
});

export const setCurrentUser = response => {
  const { user, token } = response;
  const payload = {
    currentUser: { ...user, token },
    isAuthenticated: true,
  };
  try {
    syncToLocalStorage(payload);
  } catch (error) {
    // not supported in browser
  }

  return {
    type: SET_CURRENT_USER,
    payload,
  };
};

export const requestSignup = () => ({
  type: REQUEST_SIGNUP,
});

export const signupFailure = response => ({
  type: SIGNUP_FAILURE,
});

export const createUserAccount = params => async dispatch => {
  const header = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/users/signup`;

  dispatch(requestSignup());
  return axios
    .post(url, params, { headers: header })
    .then(response => dispatch(setCurrentUser(response)))
    .catch(ex => dispatch(signupFailure(ex)));
};

export const userFromOauth = params => async dispatch => {
  const header = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/oauth/authenticate`;

  dispatch(requestSignup());
  return axios
    .post(url, params, { headers: header })
    .then(response => dispatch(setCurrentUser(response)))
    .catch(ex => dispatch(signupFailure(ex)));
};
