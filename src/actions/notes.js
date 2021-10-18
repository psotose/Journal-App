import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
import { loadNotes } from "../helpers/loadNotes";
 
 
export const startNewNote = () => { 
 
  return async (dispatch, getState) => { 
 
    const uid = getState().auth.uid;
 
    const newNote = { 
      title: '',
      body: '',
      date: new Date().getTime()
    }
 

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
    console.log(doc);
    
    dispatch( activeNote( doc.id, newNote));
  }
};

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const startLoadingNotes = ( uid ) => {
  return async( dispatch ) => {
    const notes = await loadNotes( uid );
    dispatch( setNotes( notes ) );
  }
};

export const setNotes = ( notes ) => ({
  type: types.notesLoad,
  payload: notes
});

