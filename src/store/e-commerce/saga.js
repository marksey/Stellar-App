import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_LOADS,
} from "./actionTypes"

import {

  getLoadsSuccess,
  getLoadsFail,

} from "./actions"

//Include Both Helper File with needed methods
import {
 
  getLoads,
 
} from "helpers/fakebackend_helper"

function* fetchLoads() {
  try {
    const response = yield call(getLoads)
    yield put(getLoadsSuccess(response))
  } catch (error) {
    yield put(getLoadsFail(error))
  }
}

function* ecommerceSaga() {
  yield takeEvery(GET_LOADS, fetchLoads)
}

export default ecommerceSaga
