import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        isAuthenticated: !!action.payload,
        ...action.payload,
      };
    case SET_CURRENT_USER:
      return { ...action.payload };
    case REQUEST_SIGNUP:
      return { userAccount: { created: false } };
    case REQUEST_LOGIN:
      return { userLogin: { ok: false } };
    default:
      return state;
  }
};

export default currentUser;
