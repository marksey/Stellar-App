import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)


// get chats
export const getChats = () => get(url.GET_CHATS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

//export const getLoads = () => get(url.GET_LOADS)

//Get loads to REAL Node JS server
//Returns a promise
export const getLoads = () => {

  return new Promise((resolve, reject) => {

    fetch('http://localhost:3001/server/get/loads')
    .then(async response => {
  
      const data = await response.json()
      const fetchedLoads = []
  
      //Grab actual loads from response data
      Object.keys(data.loads).map(key => 
        fetchedLoads.push(data.loads[key])
      )
  
      //Send loads back to requester /fetchLoads() 
      resolve(fetchedLoads)

    }).catch(err => reject(err))
    
  })
}


// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })


// get drivers
export const getDrivers = () => get(url.GET_DRIVERS)

// get shippers
export const getShippers = () => get(url.GET_SHIPPERS)

// get receivers
export const getReceivers = () => get(url.GET_RECEIVERS)

// get trucks
export const getTrucks = () => get(url.GET_TRUCKS)

// get trucking customers
export const getTruckingCustomers = () => get(url.GET_TRUCKING_CUSTOMERS)

{/*
// add load
export const addNewLoad = load => get(url.ADD_NEW_LOAD)
*/}


//Here's what's left to do:
//Retrieve loads from a JSON file
//Create a get method to retrieve loads which will set the state
//Real POST load to Node JS server
export const addNewLoad = (load) => {

    console.log("Got the load in react")
    console.log(load)

    //Post load to Node JS express server
    fetch('http://localhost:3001/server/add/load', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(load),  
    })
    .then(response => response.json())
    .then(data => {
      console.log("Done posting in react")
      console.log("Data: ") + data
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    })
    .catch((error) => {
      console.error('Error:', error);
    })

}


export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile
}
