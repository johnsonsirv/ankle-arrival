import { RECEIVE_DOCTORS, REQUEST_DOCTORS } from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  doctors: [],
};

const doctors = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DOCTORS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_DOCTORS:
      return {
        ...state,
        doctors: [...action.payload],
        isFetching: false,
      };
    default:
      return state;
  }
};

export default doctors;
