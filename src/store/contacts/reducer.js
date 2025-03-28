import {
  GET_DRIVERS_SUCCESS,
  GET_DRIVERS_FAIL,
  GET_SHIPPERS_SUCCESS,
  GET_SHIPPERS_FAIL,
  GET_TRUCKING_CUSTOMERS_SUCCESS,
  GET_TRUCKING_CUSTOMERS_FAIL,
  ADD_LOAD_SUCCESS,
  ADD_LOAD_FAIL,
  GET_TRUCKS_SUCCESS,
  GET_TRUCKS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
  drivers: [],
  loads: [],
  shippers: [],
  truckingCustomers: [],
  trucks: [],
}

//This is where you set the state with data 
//after making the get requests for data

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_DRIVERS_SUCCESS:
      return {
        ...state,
        drivers: action.payload,
      }

    case GET_DRIVERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SHIPPERS_SUCCESS:
      return {
        ...state,
        shippers: action.payload,
      }

    case GET_SHIPPERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TRUCKING_CUSTOMERS_SUCCESS:
      return {
        ...state,
        truckingCustomers: action.payload,
      }

    case GET_TRUCKING_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TRUCKS_SUCCESS:
      return {
        ...state,
        trucks: action.payload,
      }

    case GET_TRUCKS_FAIL:
      return {
        ...state,
        error: action.payload,
      }


    case ADD_LOAD_SUCCESS:
      return {
        ...state,
        loads: [...state.loads, action.payload],
      }

    case ADD_LOAD_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
