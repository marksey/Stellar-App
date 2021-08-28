import {
  GET_LOADS,
  GET_LOADS_SUCCESS,
  GET_LOADS_FAIL,
} from "./actionTypes"


export const getLoads = () => ({
  type: GET_LOADS,
})

export const getLoadsSuccess = loads => ({
  type: GET_LOADS_SUCCESS,
  payload: loads,
})

export const getLoadsFail = error => ({
  type: GET_LOADS_FAIL,
  payload: error,
})
