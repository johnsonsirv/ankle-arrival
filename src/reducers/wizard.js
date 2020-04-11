import {
  WIZARD_RECEIVE_INJURIES,
  WIZARD_REQUEST_INJURIES,
  WIZARD_REQUEST_SYMPTOMS,
  WIZARD_RECEIVE_SYMPTOMS,
  WIZARD_REQUEST_DIAGNOSIS,
  WIZARD_RECEIVE_DIAGNOSIS,
} from '../actions/actionTypes';

const initialState = {
  isFetching: false,
};

const appointments = (state = initialState, action) => {
  switch (action.type) {
    case WIZARD_REQUEST_INJURIES:
      return {
        ...state,
        isFetching: true,
      };
    case WIZARD_RECEIVE_INJURIES:
      return {
        ...state,
        injuries: [...action.payload],
        isFetching: false,
      };
    case WIZARD_REQUEST_SYMPTOMS:
      return {
        ...state,
        isFetching: true,
      };
    case WIZARD_RECEIVE_SYMPTOMS:
      return {
        ...state,
        symptoms: [...action.payload],
        isFetching: false,
      };
    case WIZARD_REQUEST_DIAGNOSIS:
      return {
        ...state,
        isFetching: true,
      };
    case WIZARD_RECEIVE_DIAGNOSIS:
      return {
        ...state,
        diagnosis: { ...action.payload },
        isFetching: false,
      };
    default:
      return state;
  }
};

export default appointments;
