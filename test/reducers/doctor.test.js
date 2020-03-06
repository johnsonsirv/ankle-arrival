import {
  RECEIVE_DOCTORS,
  REQUEST_DOCTORS,
} from '../../src/actions/actionTypes';
import doctorReducer from '../../src/reducers/doctor';

describe('doctros reducer', () => {
  it('should return an initial state', () => {
    const state = doctorReducer(undefined, {});
    expect(state).toEqual({
      isFetching: false,
      doctors: [],
    });
  });

  it('should handle REQUEST_DOCTORS action', () => {
    const state = doctorReducer(undefined, {
      type: REQUEST_DOCTORS,
    });
    expect(state).toEqual({
      isFetching: true,
      doctors: [],
    });
  });

  it('should handle RECEIVE_DOCTORS action', () => {
    const state = doctorReducer(
      {},
      {
        type: RECEIVE_DOCTORS,
        payload: [{ firstname: 'John', lastname: 'Mabel' }],
      }
    );
    expect(state).toEqual({
      isFetching: false,
      doctors: [{ firstname: 'John', lastname: 'Mabel' }],
    });
  });

  it('should handle RECEIVE_DOCTORS with incrememental state', () => {
    const incrementedState = doctorReducer(
      {},
      {
        type: RECEIVE_DOCTORS,
        payload: [
          { firstname: 'John', lastname: 'Mabel' },
          { firstname: 'Larry', lastname: 'Page' },
        ],
      }
    );

    expect(incrementedState).toEqual({
      isFetching: false,
      doctors: [
        { firstname: 'John', lastname: 'Mabel' },
        { firstname: 'Larry', lastname: 'Page' },
      ],
    });
  });
});
