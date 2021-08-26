import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DRIVERS,
  GET_RECEIVERS,
  GET_SHIPPERS,
  GET_TRUCKING_CUSTOMERS,
  GET_TRUCKS,
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_LOAD,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER
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
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addLoadFail,
  addLoadSuccess,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDrivers,
  getShippers,
  getReceivers,
  getTruckingCustomers,
  getTrucks,
  getUsers,
  getUserProfile,
  addNewLoad,
  addNewUser,
  updateUser,
  deleteUser
} from "../../helpers/fakebackend_helper"

function* fetchTrucks() {
  try {
    console.log("trying to fetch trucks")
    const response = yield call(getTrucks)
    console.log("fetching trucks!!! ")
    console.log(response)
    yield put(getTrucksSuccess(response))
  } catch (error) {
    console.log("Here's the error: ")
    console.log(error)
    yield put(getTrucksFail(error))
  }
}

function* fetchTruckingCustomers() {
  try {
    console.log("trying to fetch trucking customers")
    const response = yield call(getTruckingCustomers)
    console.log("fetching customers!!! ")
    console.log(response)
    yield put(getTruckingCustomersSuccess(response))
  } catch (error) {
    console.log("Here's the error: ")
    console.log(error)
    yield put(getTruckingCustomersFail(error))
  }
}


function* fetchReceivers() {
  try {
    console.log("trying to fetch receivers")
    const response = yield call(getReceivers)
    console.log("fetching receivers!!! ")
    console.log(response)
    yield put(getReceiversSuccess(response))
  } catch (error) {
    console.log("Here's the error: ")
    console.log(error)
    yield put(getReceiversFail(error))
  }
}

function* fetchShippers() {
  try {
    console.log("trying to fetch shippers")
    const response = yield call(getShippers)
    console.log("fetching shippers!!! ")
    console.log(response)
    yield put(getShippersSuccess(response))
  } catch (error) {
    console.log("Here's the error: ")
    console.log(error)
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

function* fetchUsers() {
  try {
    console.log("Trying to get users!!!!")
    const response = yield call(getUsers)
    console.log(response)
    console.log("Getting users!!!!")
    yield put(getUsersSuccess(response))
  } catch (error) {
    console.log("error is: ")
    console.log(error)
    yield put(getUsersFail(error))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
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

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user)
    yield put(addUserSuccess(response))
  } catch (error) {

    yield put(addUserFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_DRIVERS, fetchDrivers)
  yield takeEvery(GET_RECEIVERS, fetchReceivers)
  yield takeEvery(GET_SHIPPERS, fetchShippers)
  yield takeEvery(GET_TRUCKING_CUSTOMERS, fetchTruckingCustomers)
  yield takeEvery(GET_TRUCKS, fetchTrucks)
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_LOAD, onAddNewLoad)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga
