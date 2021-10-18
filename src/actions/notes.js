import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
 
 
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
}

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})

