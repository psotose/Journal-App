import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import { firebase } from "../../firebase/firebaseConfig";

import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "@testing-library/react";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ABC",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Testing <AppRouter />", () => {
  test("should call login action if Im authenticathed", async() => {
    let user;

    await act(async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      )
      const user = {uid: 1234, displayName: "John"};
      const authMock = {
        firebase: {
          auth: () => ({
              signOut: jest.fn(),
              signInWithEmailAndPassword: jest.fn( () => Promise.resolve({user})  ),
              onAuthStateChanged: jest.fn( (callback) => callback(user))
          })
        }
      };
      jest.mock('../../firebase/firebase-config', () => (authMock));
      // Esto con una test db
      // const userCred = await firebase
      //   .auth()
      //   .signInWithEmailAndPassword("test@testing.com", "123456");
      // user = userCred.user;     
    });

    expect(login).toHaveBeenCalledWith("user.uid", null);
  });
});