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
  WIZARD_NEXT_STEP,
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
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/doctors`;

  try {
    await dispatch(requestDoctors());
    const { data: res } = await axios.get(url, { headers });
    await dispatch(receiveDoctors(res));
  } catch (ex) {
    console.log(ex);
  }
};

// 2. appointments
export const addNewAppointmentSuccess = payload => ({
  type: NEW_APPOINTMENT_SUCCESS,
  payload,
});

export const addNewAppointmentFailure = () => ({
  type: NEW_APPOINTMENT_FAILURE,
});

export const requestNewAppointment = () => ({
  type: REQUEST_NEW_APPOINTMENT,
});

export const addNewAppointment = payload => async dispatch => {
  const { params, token } = payload;

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/appointments`;

  try {
    dispatch(requestNewAppointment());
    const { data: res } = await axios.post(url, params, { headers });
    dispatch(addNewAppointmentSuccess(res));
  } catch (ex) {
    dispatch(addNewAppointmentFailure());
  }
};

export const requestAppointments = () => ({
  type: REQUEST_APPOINTMENTS,
});

export const receiveAppointments = payload => ({
  type: RECEIVE_APPOINTMENTS,
  payload,
});

export const fetchAppointments = token => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const url = `${apiEndPoint}/users/appointments`;

  try {
    await dispatch(requestAppointments());
    const { data: res } = await axios.get(url, { headers });
    await dispatch(receiveAppointments(res));
  } catch (ex) {
    console.log(ex);
  }
};

// 3. auth

const getUserFromLocalStorage = () => (
  JSON.parse(localStorage.getItem('currentUser')) || null
);
const syncToLocalStorage = data => (
  localStorage.setItem('currentUser', JSON.stringify(data))
);

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

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const authenticateUser = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/auth/login`;

  try {
    await dispatch(requestLogin());
    const { data: res } = await axios.post(url, params, { headers });
    await dispatch(setCurrentUser(res));
  } catch (ex) {
    dispatch(loginFailure());
  }
};

export const requestSignup = () => ({
  type: REQUEST_SIGNUP,
});

export const signupFailure = () => ({
  type: SIGNUP_FAILURE,
});

export const createUserAccount = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/users/signup`;

  try {
    await dispatch(requestSignup());
    const { data: res } = await axios.post(url, params, { headers });
    await dispatch(setCurrentUser(res));
  } catch (ex) {
    dispatch(signupFailure());
  }
};

export const userFromOauth = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${apiEndPoint}/users/oauth`;

  try {
    await dispatch(requestSignup());
    const { data: res } = await axios.post(url, params, { headers });
    await dispatch(setCurrentUser(res));
  } catch (ex) {
    dispatch(loginFailure());
    console.log(ex.message);
  }
};

// 4. Wizard
export const wizardNextStep = step => {
  const payload = {};
  payload[step.title] = true;
  return {
    type: WIZARD_NEXT_STEP,
    payload,
  };
};

export const wizardPreviousStep = step => dispatch => {
  const payload = {};
  payload[step.title] = true;
  dispatch({
    type: WIZARD_NEXT_STEP,
    payload,
  });
};

export const wizardRequestInjuries = () => ({
  type: WIZARD_REQUEST_INJURIES,
});

export const wizardReceiveInjuries = payload => ({
  type: WIZARD_RECEIVE_INJURIES,
  payload,
});

export const wizardFetchInjuries = () => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${wizardApiEndPoint}/injuries`;

  try {
    await dispatch(wizardRequestInjuries());
    const { data: res } = await axios.get(url, { headers });
    await dispatch(wizardReceiveInjuries(res));
    await dispatch(wizardNextStep({ title: 'injury' }));
  } catch (ex) {
    console.log(ex.message);
  }
};

export const wizardRequestSymptoms = () => ({
  type: WIZARD_REQUEST_SYMPTOMS,
});

export const wizardReceiveSymptoms = payload => ({
  type: WIZARD_RECEIVE_SYMPTOMS,
  payload,
});

export const wizardFetchSymptoms = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${wizardApiEndPoint}/symptoms/${params}`;

  try {
    await dispatch(wizardRequestSymptoms());
    const { data: res } = await axios.get(url, { headers });
    await dispatch(wizardReceiveSymptoms(res));
    await dispatch(wizardNextStep({ title: 'symptoms' }));
  } catch (ex) {
    console.log(ex.message);
  }
};

export const wizardShowBioPage = () => dispatch => (
  dispatch(wizardNextStep({ title: 'bio' }))
);

export const wizardRequestDiagnosis = () => ({
  type: WIZARD_REQUEST_DIAGNOSIS,
});

export const wizardReceiveDiagnosis = payload => ({
  type: WIZARD_RECEIVE_DIAGNOSIS,
  payload,
});

export const wizardFetchDiagnosis = params => async dispatch => {
  const headers = {
    'Content-type': 'application/json',
  };
  const url = `${wizardApiEndPoint}/diagnose`;

  try {
    await dispatch(wizardRequestDiagnosis());
    const { data: res } = await axios.post(url, params, { headers });
    await dispatch(wizardReceiveDiagnosis(res));
    await dispatch(wizardNextStep({ title: 'diagnosis' }));
  } catch (ex) {
    console.log(ex.message);
  }
};
