import { types } from "../types/types";

/* State si estoy logueado
  {
    uid: '234234hshd23',
    name: 'Patricia'
  }
*/
export const authReducer = ( state = {}, action ) => {

  switch ( action.type ) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      }
    
    case types.logout:
      return { }
  
    default:
      return state;
  }
}