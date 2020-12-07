import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import {countriesSlice} from "../app/modules/Users/_redux/countries/countriesSlice";
import {departmentsSlice} from "../app/modules/Users/_redux/departments/departmentsSlice";
import {usersSlice} from "../app/modules/Users/_redux/users/usersSlice";

import * as auth from "../app/modules/Auth/_redux/authRedux";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  countries: countriesSlice.reducer,
  departments:departmentsSlice.reducer,
  users:usersSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
