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
  WIZARD_NEXT_STEP,
  REQUEST_NEW_APPOINTMENT,
  NEW_APPOINTMENT_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  NEW_APPOINTMENT_FAILURE,
} from '../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('fetchDoctors async actions', () => {
  it('should create RECEIVE_DOCTORS when fetching doctors is done', () => {
    const mockResponse = {
      data: [{ firstname: 'John', lastname: 'Mabel' }],
    };

    const expectedActions = [
      { type: REQUEST_DOCTORS },
      {
        type: RECEIVE_DOCTORS,
        payload: mockResponse.data,
      },
    ];

    const token = 'xxxx.yyy.zzz';
    const store = mockStore({ doctors: [] });

    axios.get.mockResolvedValue(mockResponse);
    return store.dispatch(actions.fetchDoctors(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('fetchAppointments async actions', () => {
  it('should create RECEIVE_APPOINTMENTS when fetching appointment is done', () => {
    const mockResponse = {
      data: [
        { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
      ],
    };
    const expectedActions = [
      { type: REQUEST_APPOINTMENTS },
      {
        type: RECEIVE_APPOINTMENTS,
        payload: mockResponse.data,
      },
    ];
    const store = mockStore({ appointments: [] });
    const currentUser = {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    };

    axios.get.mockResolvedValue(mockResponse);
    return store.dispatch(actions.fetchAppointments(currentUser)).then(() => {
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
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    };
    const payload = {
      ...response,
      isAuthenticated: true,
    };
    const expectedAction = {
      type: SET_CURRENT_USER,
      payload,
    };

    expect(actions.setCurrentUser(response)).toEqual(expectedAction);
  });
});

describe('book appointment async actions', () => {
  it('should create NEW_APPOINTMENT_SUCCESS when book new appointment is done', () => {
    const mockResponse = {
      data: { message: 'Successful' },
    };

    const payload = { ...mockResponse.data };

    const newAppointmentParams = {
      token: 'xxx.yyy.zzz',
      params: {
        doctor: { id: 1 },
        description: 'description',
        appointment_date: 'date',
        appointment_time: 'time',
      },
    };

    const expectedActions = [
      { type: REQUEST_NEW_APPOINTMENT },
      {
        type: NEW_APPOINTMENT_SUCCESS,
        payload,
      },
    ];

    axios.post.mockResolvedValue(mockResponse);
    const store = mockStore({});
    return store.dispatch(actions.addNewAppointment(newAppointmentParams))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
  });

  it('should dispatch NEW_APPOINTMENT_FAILURE when saving new appointment fails', () => {
    const mockResponse = {
      data: {
        message: 'bad request',
      },
    };

    const invalidApppointmentParams = {
      token: 'xxx.yyy.zzz',
      params: {},
    };

    const expectedAction = [
      { type: REQUEST_NEW_APPOINTMENT },
      { type: NEW_APPOINTMENT_FAILURE },
    ];

    const store = mockStore({});
    axios.post.mockRejectedValue(mockResponse);
    return store.dispatch(actions.addNewAppointment(invalidApppointmentParams))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedAction);
      });
  });
});

describe('authentication async actions', () => {
  it('should create SET_CURRENT_USER when signup is done', () => {
    const mockResponse = {
      data: {
        username: 'jobe123',
        token: 'xxx.yyy.zzz',
      },
    };
    const payload = {
      ...mockResponse.data,
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
    const store = mockStore({ userAccount: { invalid: false, isFetching: false } });
    return store.dispatch(actions.createUserAccount(signupParams)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch signupFaluire when signup fails', () => {
    const mockResponse = {
      data: {
        message: 'bad request',
      },
    };

    const expectedAction = [
      { type: REQUEST_SIGNUP },
      { type: SIGNUP_FAILURE },
    ];

    const store = mockStore({ userAccount: { invalid: false, isFetching: false } });
    axios.post.mockRejectedValue(mockResponse);
    return store.dispatch(actions.createUserAccount({}))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedAction);
      });
  });

  it('should create SET_CURRENT_USER when login is done', () => {
    const mockResponse = {
      data: {
        username: 'jobe123',
        token: 'xxx.yyy.zzz',
      },
    };
    const payload = {
      ...mockResponse.data,
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
    const store = mockStore({ userLogin: { invalid: false, isFetching: false } });
    return store.dispatch(actions.authenticateUser(loginParams)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch loginFaluire when login credential is incorrect', () => {
    const mockResponse = {
      data: {
        message: 'unauthorized access',
      },
    };

    const expectedAction = [
      { type: REQUEST_LOGIN },
      { type: LOGIN_FAILURE },
    ];

    const store = mockStore({ userLogin: { invalid: false, isFetching: false } });
    axios.post.mockRejectedValue(mockResponse);
    return store.dispatch(actions.authenticateUser({}))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedAction);
      });
  });
});

describe('Wizard async actions', () => {
  it('should create RECEIVE_INJURIES when fetching injuries is done', () => {
    const mockResponse = {
      data: [
        { id: 1, name: 'abdominal', code: 1 },
        { id: 2, name: 'bone', code: 2 },
      ],
    };
    axios.get.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: WIZARD_REQUEST_INJURIES },
      {
        type: WIZARD_RECEIVE_INJURIES,
        payload: mockResponse.data,
      },
      {
        type: WIZARD_NEXT_STEP,
        payload: { injury: true }
      }
    ];

    const store = mockStore({ injuries: [] });
    return store.dispatch(actions.wizardFetchInjuries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create RECEIVE_SYMPTOMS when fetching injuries is done', () => {
    const mockResponse = {
      data: [
        { id: 5, code: 'a14', description: 'excessive abdominal' },
      ],
    };
    axios.get.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: WIZARD_REQUEST_SYMPTOMS },
      {
        type: WIZARD_RECEIVE_SYMPTOMS,
        payload: mockResponse.data,
      },
      {
        type: WIZARD_NEXT_STEP,
        payload: { symptoms: true }
      }
    ];

    const store = mockStore({ symptoms: [] });
    const { id: params } = mockResponse.data[0];
    return store.dispatch(actions.wizardFetchSymptoms(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create RECEIVE_DIAGNOSIS when fetching diagnosis is done', () => {
    const mockResponse = {
      data: {
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
    };
    axios.post.mockResolvedValue(mockResponse);
    const expectedActions = [
      { type: WIZARD_REQUEST_DIAGNOSIS },
      {
        type: WIZARD_RECEIVE_DIAGNOSIS,
        payload: mockResponse.data,
      },
      {
        type: WIZARD_NEXT_STEP,
        payload: { diagnosis: true }
      }
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
