import { combineReducers } from 'redux';
import doctors from './doctor';
import appointments from './appointment';
import currentUser from './currentUser';
import wizard from './wizard';

const rootReducer = combineReducers({
  doctors,
  appointments,
  currentUser,
  wizard,
});

export default rootReducer;
