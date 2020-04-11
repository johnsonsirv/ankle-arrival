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
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  WIZARD_REQUEST_INJURIES,
  WIZARD_RECEIVE_INJURIES,
  WIZARD_REQUEST_SYMPTOMS,
  WIZARD_RECEIVE_SYMPTOMS,
  WIZARD_REQUEST_DIAGNOSIS,
  WIZARD_RECEIVE_DIAGNOSIS,
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
      payload: null,
    };
    expect(actions.getCurrentUser()).toEqual(expectedAction);
  });
  it('should create action to setCurrentUser', () => {
    const response = {
      user: { id: 1, username: 'testUser' },
      token: 'xxx.yyy.zzz',
    };
    const payload = {
      currentUser: { id: 1, username: 'testUser', token: 'xxx.yyy.zzz' },
      isAuthenticated: true,
    };
    const expectedAction = {
      type: SET_CURRENT_USER,
      payload,
    };

    expect(actions.setCurrentUser(response)).toEqual(expectedAction);
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

describe('book appointment async actions', () => {
  it('should create NEW_APPOINTMENT_SUCCESS when book appointment is done', () => {});
});

describe('authentication async actions', () => {
  it('should create SET_CURRENT_USER when signup is done', () => {
    const mockResponse = {
      user: { id: 1, username: 'jobe123' },
      token: 'xxx.yyy.zzz',
    };
    const payload = {
      currentUser: { id: 1, username: 'jobe123', token: 'xxx.yyy.zzz' },
      isAuthenticated: true,
    };
    const expectedActions = [
      { type: REQUEST_SIGNUP },
      { type: SET_CURRENT_USER, payload },
    ];
    const signupParams = {
      firstname: 'joe',
      lastname: 'breed',
      username: 'jobe123',
      password: '1234',
      city: 'Remote',
    };
    axios.post.mockResolvedValue(mockResponse);
    const store = mockStore({ userAccount: { created: false } });
    return store.dispatch(actions.createUserAccount(signupParams)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should create SET_CURRENT_USER when login is done', () => {
    const mockResponse = {
      user: { id: 1, username: 'jobe123' },
      token: 'xxx.yyy.zzz',
    };
    const payload = {
      currentUser: { id: 1, username: 'jobe123', token: 'xxx.yyy.zzz' },
      isAuthenticated: true,
    };
    const expectedActions = [
      { type: REQUEST_LOGIN },
      { type: SET_CURRENT_USER, payload },
    ];
    const loginParams = {
      username: 'jobe123',
      password: '1234',
    };
    axios.post.mockResolvedValue(mockResponse);
    const store = mockStore({ userLogin: { ok: false } });
    return store.dispatch(actions.authenticateUser(loginParams)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Wizard async actions', () => {
  it('should create RECEIVE_INJURIES when fetching injuries is done', () => {
    const injuries = [
      { id: 1, name: 'abdominal', code: 1 },
      { id: 2, name: 'bone', code: 2 },
    ];
    const mockResponse = injuries.map(i => JSON.stringify(i));
    axios.get.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: WIZARD_REQUEST_INJURIES },
      {
        type: WIZARD_RECEIVE_INJURIES,
        payload: [
          { id: 1, name: 'abdominal', code: 1 },
          { id: 2, name: 'bone', code: 2 },
        ],
      },
    ];

    const store = mockStore({ injuries: [] });
    return store.dispatch(actions.wizardFetchInjuries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create RECEIVE_SYMPTOMS when fetching injuries is done', () => {
    const symptoms = [
      { id: 5, code: 'a14', description: 'excessive abdominal' },
    ];
    const mockResponse = symptoms.map(i => JSON.stringify(i));
    axios.get.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: WIZARD_REQUEST_SYMPTOMS },
      {
        type: WIZARD_RECEIVE_SYMPTOMS,
        payload: [{ id: 5, code: 'a14', description: 'excessive abdominal' }],
      },
    ];

    const store = mockStore({ symptoms: [] });
    const { id: params } = symptoms[0];
    return store.dispatch(actions.wizardFetchSymptoms(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create RECEIVE_DIAGNOSIS when fetching diagnosis is done', () => {
    const diagnosis = {
      id: 18,
      injury: 'abdominal',
      disease: 'blunt abdominal injury',
      symptoms: 'excessive abdominal',
      player: 'Joe Smith',
      inference:
        'if player exhibits symptoms excessive abdominal, in abdominal affected area, then there is a blunt abdominal injury disease.',
      treatment: 'surgery',
      lifestyle: 'maintain healthy lifestyle',
    };
    const mockResponse = JSON.stringify(diagnosis);
    axios.post.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: WIZARD_REQUEST_DIAGNOSIS },
      {
        type: WIZARD_RECEIVE_DIAGNOSIS,
        payload: {
          id: 18,
          injury: 'abdominal',
          disease: 'blunt abdominal injury',
          symptoms: 'excessive abdominal',
          player: 'Joe Smith',
          inference:
            'if player exhibits symptoms excessive abdominal, in abdominal affected area, then there is a blunt abdominal injury disease.',
          treatment: 'surgery',
          lifestyle: 'maintain healthy lifestyle',
        },
      },
    ];

    const store = mockStore({ diagnosis: {} });
    const params = {
      injury: 1,
      symptoms: 'a14',
      name: 'Jerry Flower',
      age: '23',
      height: '5.6',
      gender: 'male',
    };
    return store.dispatch(actions.wizardFetchDiagnosis(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
