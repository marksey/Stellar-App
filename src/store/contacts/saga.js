import { call, put, takeEvery } from "redux-saga/effects"

// Redux States
import {
  ADD_NEW_LOAD,
  ASSIGN_LOAD_TO_DRIVER,
  GET_DRIVERS,
  GET_RECEIVERS,
  GET_SHIPPERS,
  GET_TRUCKING_CUSTOMERS,
  GET_TRUCKS,
} from "./actionTypes"


//May not need getReceivers since a company is a company
//May need to just have on function called getCompanies
//Also remove up all the functions this app doesn't need
import {
  getDriversSuccess,
  getDriversFail,
  getTruckingCustomersSuccess,
  getTruckingCustomersFail,
  getTrucksSuccess,
  getTrucksFail,
  getReceiversSuccess,
  getReceiversFail,
  getShippersSuccess,
  getShippersFail,
  addLoadFail,
  addLoadSuccess,
  assignDriverToLoadFail,
  assignDriverToLoadSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDrivers,
  getShippers,
  getReceivers,
  getTruckingCustomers,
  getTrucks,
  addNewLoad,
  assignDriverToLoad
} from "../../helpers/fakebackend_helper"

function* fetchTrucks() {
  try {
    const response = yield call(getTrucks)
    yield put(getTrucksSuccess(response))
  } catch (error) {
  
    yield put(getTrucksFail(error))
  }
}

function* fetchTruckingCustomers() {
  try {
    const response = yield call(getTruckingCustomers)
    yield put(getTruckingCustomersSuccess(response))
  } catch (error) {
    yield put(getTruckingCustomersFail(error))
  }
}


function* fetchReceivers() {
  try {
    const response = yield call(getReceivers)
    yield put(getReceiversSuccess(response))
  } catch (error) {
    yield put(getReceiversFail(error))
  }
}

function* fetchShippers() {
  try {
    const response = yield call(getShippers)
    yield put(getShippersSuccess(response))
  } catch (error) {
    yield put(getShippersFail(error))
  }
}


function* fetchDrivers() {
  try {
    console.log("Fetching drivers!!!!")
    const response = yield call(getDrivers)
    yield put(getDriversSuccess(response))
  } catch (error) {
    yield put(getDriversFail(error))
  }
}


function* onAddNewLoad({ payload: load }) {
  try {
    console.log("onAddNewLoad generator!!!")
    console.log("load:" + load)
    const response = yield call(addNewLoad, load)
    console.log(response)
    yield put(addLoadSuccess(response))
  } catch (error) {

    yield put(addLoadFail(error))
  }
}

function* onAssignDriverToLoad({ payload: load }) {
  try {
    const response = yield call(assignDriverToLoad, load.load, load.driver)
    yield put(assignDriverToLoadSuccess(response))
  } catch (error) {
    yield put(assignDriverToLoadFail(error))
  }
}



function* contactsSaga() {
  yield takeEvery(GET_DRIVERS, fetchDrivers)
  yield takeEvery(GET_RECEIVERS, fetchReceivers)
  yield takeEvery(GET_SHIPPERS, fetchShippers)
  yield takeEvery(GET_TRUCKING_CUSTOMERS, fetchTruckingCustomers)
  yield takeEvery(GET_TRUCKS, fetchTrucks)
  yield takeEvery(ADD_NEW_LOAD, onAddNewLoad)
  yield takeEvery(ASSIGN_LOAD_TO_DRIVER, onAssignDriverToLoad)
}

export default contactsSaga
