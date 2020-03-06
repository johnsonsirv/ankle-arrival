import axios from 'axios';
import config from '../config.json';
import { RECEIVE_DOCTORS, REQUEST_DOCTORS } from './actionTypes';
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
