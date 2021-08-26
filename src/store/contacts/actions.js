import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_DRIVERS,
  GET_DRIVERS_FAIL,
  GET_DRIVERS_SUCCESS,
  GET_RECEIVERS,
  GET_RECEIVERS_FAIL,
  GET_RECEIVERS_SUCCESS,
  GET_SHIPPERS,
  GET_SHIPPERS_FAIL,
  GET_SHIPPERS_SUCCESS,
  GET_TRUCKING_CUSTOMERS,
  GET_TRUCKING_CUSTOMERS_FAIL,
  GET_TRUCKING_CUSTOMERS_SUCCESS,
  GET_TRUCKS,
  GET_TRUCKS_SUCCESS,
  GET_TRUCKS_FAIL,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_LOAD,
  ADD_LOAD_SUCCESS,
  ADD_LOAD_FAIL,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

export const getReceivers = () => ({
  type: GET_RECEIVERS,
})

export const getReceiversSuccess = receivers => ({
  type: GET_RECEIVERS_SUCCESS,
  payload: receivers,
})

export const getReceiversFail = error => ({
  type: GET_RECEIVERS_FAIL,
  payload: error,
})

export const getShippers = () => ({
  type: GET_SHIPPERS,
})

export const getShippersSuccess = shippers => ({
  type: GET_SHIPPERS_SUCCESS,
  payload: shippers,
})

export const getShippersFail = error => ({
  type: GET_SHIPPERS_FAIL,
  payload: error,
})

export const getTruckingCustomers = () => ({
  type: GET_TRUCKING_CUSTOMERS,
})

export const getTruckingCustomersSuccess = truckingCustomers => ({
  type: GET_TRUCKING_CUSTOMERS_SUCCESS,
  payload: truckingCustomers,
})

export const getTruckingCustomersFail = error => ({
  type: GET_TRUCKING_CUSTOMERS_FAIL,
  payload: error,
})

export const getTrucks = () => ({
  type: GET_TRUCKS,
})

export const getTrucksSuccess = trucks => ({
  type: GET_TRUCKS_SUCCESS,
  payload: trucks,
})

export const getTrucksFail = error => ({
  type: GET_TRUCKS_FAIL,
  payload: error,
})

export const getDrivers = () => ({
  type: GET_DRIVERS,
})

export const getDriversSuccess = drivers => ({
  type: GET_DRIVERS_SUCCESS,
  payload: drivers,
})

export const getDriversFail = error => ({
  type: GET_DRIVERS_FAIL,
  payload: error,
})

export const getUsers = () => ({
  type: GET_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})

//ADD NEW LOADS
export const addNewLoad = load => ({
  type: ADD_NEW_LOAD,
  payload: load,
})

export const addLoadSuccess = load => ({
  type: ADD_LOAD_SUCCESS,
  payload: load,
})

export const addLoadFail = error => ({
  type: ADD_LOAD_FAIL,
  payload: error,
})

export const addNewUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})
