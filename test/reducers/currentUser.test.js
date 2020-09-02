import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REQUEST_SIGNUP,
  SIGNUP_FAILURE,
  REQUEST_LOGIN,
  LOGIN_FAILURE,
} from '../../src/actions/actionTypes';
import currentUserReducer from '../../src/reducers/currentUser';

describe('currentUser actions', () => {
  it('should return an initial state', () => {
    const state = currentUserReducer(undefined, {});
    expect(state).toEqual({
      isAuthenticated: false,
      userAccount: { invalid: false, isFetching: false },
      userLogin: { invalid: false, isFetching: false },
    });
  });

  it('should handle GET_CURRENT_USER action', () => {
    const state = currentUserReducer(
      {
        currentUser: {
          id: 1,
          username: 'testUser',
          token: 'xxx.yyy.zzz',
        },
        isAuthenticated: true,
      },
      {
        type: GET_CURRENT_USER,
        payload: {
          currentUser: {
            id: 1,
            username: 'testUser',
            token: 'xxx.yyy.zzz',
          },
        },
      }
    );

    expect(state).toEqual({
      currentUser: {
        id: 1,
        username: 'testUser',
        token: 'xxx.yyy.zzz',
      },
      isAuthenticated: true,
    });
  });

  it('should handle SET_CURRENT_USER action', () => {
    const user = {
      id: 1,
      username: 'testUser',
    };
    const token = 'xxx.yyy.zzz';
    const state = currentUserReducer(
      {},
      {
        type: SET_CURRENT_USER,
        payload: { currentUser: { ...user, token }, isAuthenticated: true },
      }
    );

    expect(state).toEqual({
      currentUser: {
        id: 1,
        username: 'testUser',
        token: 'xxx.yyy.zzz',
      },
      isAuthenticated: true,
    });
  });

  it('should handle REQUEST_SIGNUP action', () => {
    const state = currentUserReducer(
      {},
      { type: REQUEST_SIGNUP },
    );

    expect(state).toMatchObject({
      userAccount: { invalid: false, isFetching: true },
    });
  });

  it('should handle SIGNUP_FAILURE action', () => {
    const state = currentUserReducer(
      {},
      { type: SIGNUP_FAILURE },
    );

    expect(state).toMatchObject({
      userAccount: { invalid: true, isFetching: false },
    });
  });

  it('should handle REQUEST_LOGIN action', () => {
    const state = currentUserReducer(
      {},
      { type: REQUEST_LOGIN },
    );

    expect(state).toMatchObject({
      userLogin: { invalid: false, isFetching: true },
    });
  });

  it('should handle LOGIN_FAILURE action', () => {
    const state = currentUserReducer(
      {},
      { type: LOGIN_FAILURE },
    );

    expect(state).toMatchObject({
      userLogin: { invalid: true, isFetching: false },
    });
  });
});
