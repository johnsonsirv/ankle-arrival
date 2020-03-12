import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../../src/actions';
import {
  REQUEST_DOCTORS,
  RECEIVE_DOCTORS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  RECEIVE_APPOINTMENTS,
  REQUEST_APPOINTMENTS,
} from '../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('fetchDoctors async actions', () => {
  it('should create RECEIVE_DOCTORS when fetching doctors is done', () => {
    const doctors = [{ firstname: 'John', lastname: 'Mabel' }];
    const mockResponse = doctors.map(d => JSON.stringify(d));
    axios.get.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: REQUEST_DOCTORS },
      {
        type: RECEIVE_DOCTORS,
        payload: [{ firstname: 'John', lastname: 'Mabel' }],
      },
    ];

    const store = mockStore({ doctors: [] });
    const token = 'xxxx.yyy.zzz';
    return store.dispatch(actions.fetchDoctors(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('currentUser from store', () => {
  it('should create action to getCurrentUser', () => {
    const expectedAction = {
      type: GET_CURRENT_USER,
    };

    expect(actions.getCurrentUser()).toEqual(expectedAction);
  });
  it('should create action to setCurrentUser', () => {
    const currentUser = {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    };
    const expectedAction = {
      type: SET_CURRENT_USER,
      payload: currentUser,
    };

    expect(actions.setCurrentUser(currentUser)).toEqual(expectedAction);
  });
});

describe('fetchAppointments async actions', () => {
  it('should create RECEIVE_APPOINTMENTS when fetching appointment is done', () => {
    const appointments = [
      { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
    ];
    const mockResponse = appointments.map(d => JSON.stringify(d));
    axios.get.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: REQUEST_APPOINTMENTS },
      {
        type: RECEIVE_APPOINTMENTS,
        payload: [
          { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
        ],
      },
    ];

    const store = mockStore({ appointments: [] });
    const currentUser = {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    };
    return store.dispatch(actions.fetchAppointments(currentUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
