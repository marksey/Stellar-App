import {
  GET_DRIVERS_SUCCESS,
  GET_DRIVERS_FAIL,
  GET_SHIPPERS_SUCCESS,
  GET_SHIPPERS_FAIL,
  GET_TRUCKING_CUSTOMERS_SUCCESS,
  GET_TRUCKING_CUSTOMERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_TRUCKS_SUCCESS,
  GET_TRUCKS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
  drivers: [],
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

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      }

      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map(user =>
            user.id.toString() === action.payload.id.toString()
              ? { user, ...action.payload }
              : user
          ),
        }
  
      case UPDATE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(
            user => user.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
