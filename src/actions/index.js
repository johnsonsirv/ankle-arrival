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
  REQUEST_LOGIN,
  LOGIN_FAILURE,
  WIZARD_REQUEST_INJURIES,
  WIZARD_RECEIVE_INJURIES,
  WIZARD_REQUEST_SYMPTOMS,
  WIZARD_RECEIVE_SYMPTOMS,
  WIZARD_REQUEST_DIAGNOSIS,
  WIZARD_RECEIVE_DIAGNOSIS,
} from './actionTypes';

// configure apiEndpoint to prod
const { demoApiEndPoint: apiEndPoint, wizardApiEndPoint } = config;

export const requestDoctors = () => ({
  type: REQUEST_DOCTORS,
});

export const receiveDoctors = payload => ({
  type: RECEIVE_DOCTORS,
  payload,
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
    .then(({ data }) => dispatch(receiveDoctors(data)))
    .catch(ex => console.log(ex));
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
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/appointments`;
  dispatch(requestNewAppointment());
  return axios
    .post(url, {}, { headers })
    .then(response => dispatch(addNewAppointmentSuccess(response)))
    .catch(ex => dispatch(addNewAppointmentFailure(ex)));
};

export const requestAppointments = () => ({
  type: REQUEST_APPOINTMENTS,
});

export const receiveAppointments = payload => ({
  type: RECEIVE_APPOINTMENTS,
  payload,
});

export const fetchAppointments = token => async dispatch => {
  // const { token } = user;
  const header = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/users/appointments`;

  dispatch(requestAppointments());
  return axios
    .get(url, { headers: header })
    .then(({ data }) => dispatch(receiveAppointments(data)))
    .catch(ex => console.log(ex));
};

// 3. auth
const getUserFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('currentUser')) || null;
const syncToLocalStorage = data =>
  localStorage.setItem('currentUser', JSON.stringify(data));

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
  payload: getUserFromLocalStorage(),
});

export const setCurrentUser = response => {
  const payload = {
    ...response,
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

export const requestLogin = () => ({
  type: REQUEST_LOGIN,
});

export const loginFailure = response => ({
  type: LOGIN_FAILURE,
});

export const authenticateUser = params => async dispatch => {
  const header = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/auth/login`;

  dispatch(requestLogin());
  return axios
    .post(url, params, { headers: header })
    .then(({ data }) => dispatch(setCurrentUser(data)))
    .catch(ex => dispatch(loginFailure(ex)));
};

export const requestSignup = () => ({
  type: REQUEST_SIGNUP,
});

export const signupFailure = response => ({
  type: SIGNUP_FAILURE,
});

export const createUserAccount = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/users/signup`;

  dispatch(requestSignup());
  return axios
    .post(url, params, { headers })
    .then(({ data }) => dispatch(setCurrentUser(data)))
    .catch(ex => dispatch(signupFailure(ex)));
};

export const userFromOauth = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/oauth/authenticate`;

  dispatch(requestSignup());
  return axios
    .post(url, params, { headers })
    .then(({ data }) => dispatch(setCurrentUser(data)))
    .catch(ex => dispatch(signupFailure(ex)));
};

// 4. Wizard
export const wizardRequestInjuries = () => ({
  type: WIZARD_REQUEST_INJURIES,
});

export const wizardReceiveInjuries = response => ({
  type: WIZARD_RECEIVE_INJURIES,
  payload: response.map(data => JSON.parse(data)),
});

export const wizardFetchInjuries = () => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${wizardApiEndPoint}/injuries`;
  dispatch(wizardRequestInjuries());
  return axios
    .get(url, { headers })
    .then(response => dispatch(wizardReceiveInjuries(response)))
    .catch(({ message }) => console.log(message));
};

export const wizardRequestSymptoms = () => ({
  type: WIZARD_REQUEST_SYMPTOMS,
});

export const wizardReceiveSymptoms = response => ({
  type: WIZARD_RECEIVE_SYMPTOMS,
  payload: response.map(data => JSON.parse(data)),
});

export const wizardFetchSymptoms = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${wizardApiEndPoint}/symptoms/${params}`;

  dispatch(wizardRequestSymptoms());
  return axios
    .get(url, { headers })
    .then(response => dispatch(wizardReceiveSymptoms(response)))
    .catch(({ message }) => console.log(message));
};

export const wizardRequestDiagnosis = () => ({
  type: WIZARD_REQUEST_DIAGNOSIS,
});

export const wizardReceiveDiagnosis = response => ({
  type: WIZARD_RECEIVE_DIAGNOSIS,
  payload: JSON.parse(response),
});

export const wizardFetchDiagnosis = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${wizardApiEndPoint}/diagnose`;

  dispatch(wizardRequestDiagnosis());
  return axios
    .post(url, params, { headers })
    .then(response => dispatch(wizardReceiveDiagnosis(response)));
};
