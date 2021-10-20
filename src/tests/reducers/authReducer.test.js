import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Testing authReducer', () => {
  
  test('should perform login', () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Hernando'
      }
    };

    const state = authReducer( initState, action );

    expect( state ).toEqual({
      uid: 'abc',
      name: 'Hernando'
    });
  });

  test('should perform logout', () => {
    const initState = {
      uid: '234234hshd23',
      name: 'Patricia'
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer( initState, action );

    expect( state ).toEqual({});
  });

  test('should return initialState if the action type is not recognized', () => {
    const initState = {
      uid: '234234hshd23',
      name: 'Patricia'
    };

    const action = {
      type: 'jghjghj',
    };

    const state = authReducer( initState, action );

    expect( state ).toEqual( initState );
  });
})
