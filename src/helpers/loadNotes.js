import { db } from "../firebase/firebaseConfig";
import { collection, query, getDocs } from "@firebase/firestore";

export const loadNotes = async ( uid ) => {

  const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
  const notes = [];

  notesSnap.forEach( snapChild => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })
  });
  return notes;
}