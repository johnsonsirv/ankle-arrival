import {
  RECEIVE_APPOINTMENTS,
  REQUEST_APPOINTMENTS,
} from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  appointments: [],
};

const appointments = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_APPOINTMENTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_APPOINTMENTS:
      return {
        ...state,
        appointments: [...action.payload],
        isFetching: false,
      };
    default:
      return state;
  }
};

export default appointments;
