import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userAccount: { invalid: false, isFetching: false },
  userLogin: { invalid: false, isFetching: false },
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        ...action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...action.payload,
      };
    case REQUEST_SIGNUP:
      return { ...state, userAccount: { invalid: false, isFetching: true } };
    case SIGNUP_FAILURE:
      return { ...state, userAccount: { invalid: true, isFetching: false } };
    case REQUEST_LOGIN:
      return { ...state, userLogin: { invalid: false, isFetching: true } };
    case LOGIN_FAILURE:
      return { ...state, userLogin: { invalid: true, isFetching: false } };
    default:
      return state;
  }
};

export default currentUser;
