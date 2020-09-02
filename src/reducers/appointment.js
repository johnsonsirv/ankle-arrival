import {
  RECEIVE_APPOINTMENTS,
  REQUEST_APPOINTMENTS,
  NEW_APPOINTMENT_SUCCESS,
  REQUEST_NEW_APPOINTMENT,
  NEW_APPOINTMENT_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: { invalid: false },
  appointments: [],
  newRecord: false,
};

const appointments = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_APPOINTMENTS:
      return {
        ...state,
        isFetching: true,
        newRecord: false,
      };
    case RECEIVE_APPOINTMENTS:
      return {
        ...state,
        appointments: [...action.payload],
        isFetching: false,
      };
    case REQUEST_NEW_APPOINTMENT:
      return {
        ...state,
        isFetching: true,
        error: { invalid: false },
        newRecord: false,
      };
    case NEW_APPOINTMENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        error: { invalid: false },
        newRecord: true,
      };
    case NEW_APPOINTMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: { invalid: true },
      };
    default:
      return state;
  }
};

export default appointments;
