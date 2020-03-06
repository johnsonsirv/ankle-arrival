import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
} from '../../src/actions/actionTypes';
import currentUserReducer from '../../src/reducers/currentUser';

describe('currentUser actions', () => {
  it('should return an intial state', () => {
    const state = currentUserReducer(undefined, {});
    expect(state).toEqual({
      currentUser: undefined,
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
      },
      {
        type: GET_CURRENT_USER,
      }
    );

    expect(state).toEqual({
      currentUser: {
        id: 1,
        username: 'testUser',
        token: 'xxx.yyy.zzz',
      },
    });
  });

  it('should handle SET_CURRENT_USER action', () => {
    const currentUser = {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    };
    const state = currentUserReducer(
      {},
      {
        type: SET_CURRENT_USER,
        payload: currentUser,
      }
    );

    expect(state).toEqual({
      currentUser: {
        id: 1,
        username: 'testUser',
        token: 'xxx.yyy.zzz',
      },
    });
  });
});
