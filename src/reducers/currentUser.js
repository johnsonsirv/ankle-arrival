import { GET_CURRENT_USER, SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
  currentUser: undefined,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
      };
    case SET_CURRENT_USER:
      return {
        currentUser: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default currentUser;
