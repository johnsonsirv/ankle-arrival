import {
  WIZARD_RECEIVE_INJURIES,
  WIZARD_REQUEST_INJURIES,
  WIZARD_REQUEST_SYMPTOMS,
  WIZARD_RECEIVE_SYMPTOMS,
  WIZARD_REQUEST_DIAGNOSIS,
  WIZARD_RECEIVE_DIAGNOSIS,
} from '../../src/actions/actionTypes';
import wizardReducer from '../../src/reducers/wizard';

describe('Wizard reducer', () => {
  it('should return an initial state', () => {
    const state = wizardReducer(undefined, {});
    expect(state).toEqual({
      isFetching: false,
    });
  });

  it('should handle WIZARD_REQUEST_INJURIES action', () => {
    const state = wizardReducer(undefined, {
      type: WIZARD_REQUEST_INJURIES,
    });
    expect(state).toEqual({
      isFetching: true,
    });
  });

  it('should handle WIZARD_RECEIVE_INJURIES action', () => {
    const state = wizardReducer(
      {},
      {
        type: WIZARD_RECEIVE_INJURIES,
        payload: [
          { id: 1, name: 'abdominal', code: 1 },
          { id: 2, name: 'bone', code: 2 },
        ],
      }
    );
    expect(state).toEqual({
      isFetching: false,
      injuries: [
        { id: 0, name: '', code: 0 },
        { id: 1, name: 'abdominal', code: 1 },
        { id: 2, name: 'bone', code: 2 },
      ],
    });
  });

  it('should handle WIZARD_REQUEST_SYMPTOMS action', () => {
    const state = wizardReducer(undefined, {
      type: WIZARD_REQUEST_SYMPTOMS,
    });
    expect(state).toEqual({
      isFetching: true,
    });
  });

  it('should handle WIZARD_RECEIVE_SYMPTOMS action', () => {
    const state = wizardReducer(
      {},
      {
        type: WIZARD_RECEIVE_SYMPTOMS,
        payload: [{ id: 5, code: 'a14', description: 'excessive abdominal' }],
      }
    );
    expect(state).toEqual({
      isFetching: false,
      symptoms: [{ id: 5, code: 'a14', description: 'excessive abdominal' }],
    });
  });

  it('should handle WIZARD_REQUEST_DIAGNOSIS action', () => {
    const state = wizardReducer(undefined, {
      type: WIZARD_REQUEST_DIAGNOSIS,
    });
    expect(state).toEqual({
      isFetching: true,
    });
  });

  it('should handle WIZARD_RECEIVE_DIAGNOSIS action', () => {
    const state = wizardReducer(
      {},
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
      }
    );
    expect(state).toEqual({
      isFetching: false,
      diagnosis: {
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
    });
  });
});
