import {
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
  ADD_NEW_LOAD,
  ADD_LOAD_SUCCESS,
  ADD_LOAD_FAIL,
  ASSIGN_LOAD_TO_DRIVER,
  ASSIGN_LOAD_TO_DRIVER_SUCCESS,
  ASSIGN_LOAD_TO_DRIVER_FAIL
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

//ASSIGN LOAD TO DRIVER
export const assignDriverToLoad = (load, driver) => ({
  type: ASSIGN_LOAD_TO_DRIVER,
  payload: { load: load, driver: driver }
})

export const assignDriverToLoadSuccess = (load, driver) => ({
  type: ASSIGN_LOAD_TO_DRIVER_SUCCESS,
  payload: { load: load, driver: driver }
})

export const assignDriverToLoadFail = error => ({
  type: ASSIGN_LOAD_TO_DRIVER_FAIL,
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

