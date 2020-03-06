import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../../src/actions';
import {
  REQUEST_DOCTORS,
  RECEIVE_DOCTORS,
} from '../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('async actions', () => {
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
