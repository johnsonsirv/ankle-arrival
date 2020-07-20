import {
  RECEIVE_APPOINTMENTS,
  REQUEST_APPOINTMENTS,
  REQUEST_NEW_APPOINTMENT,
  NEW_APPOINTMENT_SUCCESS,
  NEW_APPOINTMENT_FAILURE,
} from '../../src/actions/actionTypes';
import appointmentReducer from '../../src/reducers/appointment';

describe('appointment reducer', () => {
  it('should return an initial state', () => {
    const state = appointmentReducer(undefined, {});
    expect(state).toMatchObject({
      isFetching: false,
      appointments: [],
      error: { invalid: false },
    });
  });

  it('should handle REQUEST_APPOINTMENTS action', () => {
    const state = appointmentReducer(undefined, {
      type: REQUEST_APPOINTMENTS,
    });
    expect(state).toMatchObject({
      isFetching: true,
      appointments: [],
      error: { invalid: false },
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

  it('should handle REQUEST_NEW_APPOINTMENT action', () => {
    const state = appointmentReducer(undefined, {
      type: REQUEST_NEW_APPOINTMENT,
    });
    expect(state).toMatchObject({
      appointments:[],
      isFetching: true,
      error: { invalid: false },
    });
  });

  it('should handle NEW_APPOINTMENT_SUCCESS action', () => {
    const state = appointmentReducer({}, {
      type: NEW_APPOINTMENT_SUCCESS,
      payload: { message: 'Successful' },
    });
    expect(state).toMatchObject({
      isFetching: false,
      error: { invalid: false },
    });
  });

  it('should handle NEW_APPOINTMENT_FAILURE action', () => {
    const state = appointmentReducer({}, {
      type: NEW_APPOINTMENT_FAILURE,
    });
    expect(state).toEqual({
      isFetching: false,
      error: { invalid: true },
    });
  });
});
