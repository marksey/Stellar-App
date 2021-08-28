import {
  GET_LOADS_SUCCESS,
  GET_LOADS_FAIL,
} from "./actionTypes"

//This is where you initalize the state. 
//You must include every table you pull data from.

const INIT_STATE = {
  orders: [],
  loads: [],
  error: {},
}

//Setting the state after you make request
//This is very important for pulling data!
//This has to be updated for every new table
const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    
    
    case GET_LOADS_SUCCESS:
      return {
        ...state,
        loads: action.payload,
      }

    case GET_LOADS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Ecommerce
