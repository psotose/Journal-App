import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { types } from "../../types/types";
import {
  login,
  logout,
  startLogout,
  startLoginEmailPassword,
} from "../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("Testing Auth actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login y logout should create the action expected", () => {
    const uid = "ABC123";
    const displayName = "Hernando";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });
    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("should perform startLogout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("should perform startLoginEmailPassword", async () => {
    await store.dispatch(startLoginEmailPassword("test@testing.com", "123456"));

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "fYYrX6ZV7oOD4bJHtciBV0RZWKB3",
        displayName: null,
      },
    });
  });
});
