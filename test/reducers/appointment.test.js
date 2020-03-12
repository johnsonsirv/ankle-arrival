import {
  RECEIVE_APPOINTMENTS,
  REQUEST_APPOINTMENTS,
} from '../../src/actions/actionTypes';
import appointmentReducer from '../../src/reducers/appointment';

describe('appointment reducer', () => {
  it('should return an initial state', () => {
    const state = appointmentReducer(undefined, {});
    expect(state).toEqual({
      isFetching: false,
      appointments: [],
    });
  });

  it('should handle REQUEST_APPOINTMENTS action', () => {
    const state = appointmentReducer(undefined, {
      type: REQUEST_APPOINTMENTS,
    });
    expect(state).toEqual({
      isFetching: true,
      appointments: [],
    });
  });

  it('should handle RECEIVE_APPOINTMENTS action', () => {
    const state = appointmentReducer(
      {},
      {
        type: RECEIVE_APPOINTMENTS,
        payload: [
          { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
        ],
      }
    );
    expect(state).toEqual({
      isFetching: false,
      appointments: [
        { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
      ],
    });
  });

  it('should handle RECEIVE_APPOINTMENTS with incrememental state', () => {
    const incrementedState = appointmentReducer(
      {},
      {
        type: RECEIVE_APPOINTMENTS,
        payload: [
          { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
          { dateOfAppointment: '2020/03/22', timeOfAppointment: '2:00 PM' },
        ],
      }
    );

    expect(incrementedState).toEqual({
      isFetching: false,
      appointments: [
        { dateOfAppointment: '2020/03/12', timeOfAppointment: '12:00 PM' },
        { dateOfAppointment: '2020/03/22', timeOfAppointment: '2:00 PM' },
      ],
    });
  });
});
