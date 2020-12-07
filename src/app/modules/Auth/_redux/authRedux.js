import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";
const expireReducer = require('redux-persist-expire');
export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: undefined,
};

export const reducer = persistReducer({
  storage, key: "simha-auth", whitelist: ["user"],
  transforms: [ 
    expireReducer('user', {
      expireSeconds: 3600*24,
      autoExpire: true
    }) 
  ]
},
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { user } = action.payload;

        return {  user };
      }

      case actionTypes.Register: {
        const { user } = action.payload;

        return { user };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user:{...state.user, ...user} };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user:{...state.user, ...user} };
      }

      default:
        return state;
    }
  }

);


export const actions = {
  login: (user) => ({ type: actionTypes.Login, payload: { user } }),
  register: (user) => ({
    type: actionTypes.Register,
    payload: { user },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
