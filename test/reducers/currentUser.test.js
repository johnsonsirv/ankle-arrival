import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
} from '../../src/actions/actionTypes';
import currentUserReducer from '../../src/reducers/currentUser';

describe('currentUser actions', () => {
  it('should return an initial state', () => {
    const state = currentUserReducer(undefined, {});
    expect(state).toEqual({
      isAuthenticated: false,
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
});
