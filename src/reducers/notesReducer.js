/* 
  { 
    notes: [], las notas que existen
    active: null, no hay ninguna nota seleccionada, deberia aparecer el Por favor seleccione...
    active: {
      id: 'CDHFE23HJHJ' esto nos los da firebase,
      title: '', 
      body: '', 
      imageUrl: '', que podemos tenerla o no
      date: 2235345345,
    }
  }
*/

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = ( state = initialState, action ) => {

  switch (action.type) {

    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }

    default:
      return state;
  }
}