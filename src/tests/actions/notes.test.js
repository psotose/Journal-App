/** * @jest-environment node */
import '@testing-library/jest-dom';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startNewNote,
  startLoadingNotes,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { types } from "../../types/types";
import { db } from "../../firebase/firebaseConfig";
import { doc, deleteDoc, getDoc } from "@firebase/firestore";
import { fileUpload } from "../../helpers/fileUpload";

jest.mock("../../helpers/fileUpload", () => ({

  fileUpload: jest.fn(() => {
    return "https://hola-mundo.com/cosa.jpg";
    // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "6gpwW7CCKcI5J73lSNid",
      title: "Hola",
      body: "Mundo",
    },
  },
};
let store = mockStore(initState);

describe("Testing notes actions", () => {
  jest.setTimeout(10000);
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should create a new note startNewNote", async() => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    // const docId .... action.... payload.... id
    // await ..... db.... doc(``)..... .delete();
    const docId = actions[0].payload.id;
    const noteRef = doc(db, `/TESTING/journal/notes/${docId}`);
    await deleteDoc(noteRef);
  });

  test("startLoadingNotes should load notes", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSaveNote should update note", async() => {
    const note = {
      id: "6gpwW7CCKcI5J73lSNid",
      title: "titulo",
      body: "body",
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    // console.log(actions);
    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await getDoc(doc(db, `/TESTING/journal/notes/${note.id}`));

    expect(docRef.data().title).toBe(note.title);
  });

  test("startUploading should update entry url", async() => {
    global.File = class MockFile {
      constructor(parts, filename, properties) {
          this.filename = filename;
      }
    };

    fileUpload.mockImplementation(() => 'https://hola-mundo.com/cosa.jpg');
    const file = new File([], "foto.jpg");
    await store.dispatch(startUploading(file));

    const docRef = await getDoc(doc(db, "/TESTING/journal/notes/6gpwW7CCKcI5J73lSNid"));
    expect(docRef.data().url).toBe("https://hola-mundo.com/cosa.jpg");
  });

});