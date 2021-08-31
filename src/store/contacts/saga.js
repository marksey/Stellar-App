import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  ADD_NEW_LOAD,
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
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDrivers,
  getShippers,
  getReceivers,
  getTruckingCustomers,
  getTrucks,
  addNewLoad,
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
    const response = yield call(getDrivers)
    yield put(getDriversSuccess(response))
  } catch (error) {
    yield put(getDriversFail(error))
  }
}



function* onAddNewLoad({ payload: load }) {
  try {
    const response = yield call(addNewLoad, load)
    yield put(addLoadSuccess(response))
  } catch (error) {

    yield put(addLoadFail(error))
  }
}


function* contactsSaga() {
  yield takeEvery(GET_DRIVERS, fetchDrivers)
  yield takeEvery(GET_RECEIVERS, fetchReceivers)
  yield takeEvery(GET_SHIPPERS, fetchShippers)
  yield takeEvery(GET_TRUCKING_CUSTOMERS, fetchTruckingCustomers)
  yield takeEvery(GET_TRUCKS, fetchTrucks)
  yield takeEvery(ADD_NEW_LOAD, onAddNewLoad)
}

export default contactsSaga
