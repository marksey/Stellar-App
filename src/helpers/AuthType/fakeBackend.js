import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import * as url from "../url_helper"
import accessToken from "../jwt-token-access/accessToken"
import {
  chats,
  contacts,
  groups,
  invoiceList,
  messages,
  loads,
  shippers,
  truckingCustomers,
  trucks,
  drivers,
  users as members,
} from "../../common/data"

let users = [
  {
    uid: 1,
    username: "David K.",
    role: "admin",
    password: "123456",
    email: "mark@stellarapp.com",
  },
]

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
 
  const mock = new MockAdapter(axios)

  mock.onPost("/post-fake-register").reply(config => {
    const user = JSON.parse(config["data"])
    users.push(user)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user])
      })
    })
  })

  mock.onPost("/post-fake-login").reply(config => {
    const user = JSON.parse(config["data"])
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]])
        } else {
          reject([
            "Username and password are invalid. Please enter correct username and password",
          ])
        }
      })
    })
  })

  mock.onPost("/fake-forget-pwd").reply(config => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."])
      })
    })
  });

  mock.onPost("/post-jwt-register").reply(config => {
    const user = JSON.parse(config["data"])
    users.push(user)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user])
      })
    })
  })

  mock.onPost("/post-jwt-login").reply(config => {
    const user = JSON.parse(config["data"])
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken

          // JWT AccessToken
          const tokenObj = { accessToken: token } // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj } // validUser Obj

          resolve([200, validUserObj])
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ])
        }
      })
    })
  })

  mock.onPost("/post-jwt-profile").reply(config => {
    const user = JSON.parse(config["data"])

    const one = config.headers

    let finalToken = one.Authorization

    const validUser = users.filter(usr => usr.uid === user.idx)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex(obj => obj.uid === user.idx)

            //Update object's name property.
            users[objIndex].username = user.username

            // Assign a value to locastorage
            localStorage.removeItem("authUser")
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]))

            resolve([200, "Profile Updated successfully"])
          } else {
            reject([400, "Something wrong for edit profile"])
          }
        } else {
          reject([400, "Invalid Token !!"])
        }
      })
    })
  })

  mock.onPost("/post-fake-profile").reply(config => {
    const user = JSON.parse(config["data"])

    const validUser = users.filter(usr => usr.uid === user.idx)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex(obj => obj.uid === user.idx)

          //Update object's name property.
          users[objIndex].username = user.username

          // Assign a value to locastorage
          localStorage.removeItem("authUser")
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]))

          resolve([200, "Profile Updated successfully"])
        } else {
          reject([400, "Something wrong for edit profile"])
        }
      })
    })
  })

  mock.onPost("/jwt-forget-pwd").reply(config => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."])
      })
    })
  })

  {/*
  //Add a new load
  mock.onPost(url.ADD_NEW_LOAD).reply(load => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (load && load.data) {
          // Passing fake JSON data as response
          console.log("Posting the load inside fakebackend.js!")
          console.log("load:" + load.data)
          resolve([200, load.data])
        } else {
          console.log("Can't add load!")
          reject([400, "Cannot add load"])
        }
      })
    })
  })
  */}

 
  mock.onGet(url.GET_CHATS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (chats) {
          // Passing fake JSON data as response
          resolve([200, chats])
        } else {
          reject([400, "Cannot get chats"])
        }
      })
    })
  })


  mock.onGet(new RegExp(`${url.GET_MESSAGES}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (messages) {
          // Passing fake JSON data as response
          const { params } = config
          const filteredMessages = messages.filter(
            msg => msg.roomId === params.roomId
          )
          resolve([200, filteredMessages])
        } else {
          reject([400, "Cannot get messages"])
        }
      })
    })
  })

  mock.onPost(url.ADD_MESSAGE).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.data) {
          // Passing fake JSON data as response
          resolve([200, config.data])
        } else {
          reject([400, "Cannot add message"])
        }
      })
    })
  })

  mock.onGet(url.GET_LOADS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (loads) {
          // Passing fake JSON data as response
          console.log("inside mock request" + loads)
          resolve([200, loads])
        } else {
          reject([400, "Cannot get load data"])
        }
      })
    })
  })


  mock.onGet(url.GET_INVOICES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invoiceList) {
          // Passing fake JSON data as response
          resolve([200, invoiceList])
        } else {
          reject([400, "Cannot get invoices"])
        }
      })
    })
  })

  mock.onGet(new RegExp(`${url.GET_INVOICE_DETAIL}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invoiceList) {
          // Passing fake JSON data as response
          const { params } = config
          const invoice = invoiceList.find(
            invoice => invoice.id.toString() === params.id.toString()
          )
          resolve([200, invoice])
        } else {
          reject([400, "Cannot get invoice"])
        }
      })
    })
  })



  mock.onGet(url.GET_DRIVERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (drivers) {
          // Passing fake JSON data as response
          resolve([200, drivers])
        } else {
          reject([400, "Cannot get drivers"])
        }
      })
    })
  })

  mock.onGet(url.GET_SHIPPERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shippers) {
          // Passing fake JSON data as response
          resolve([200, shippers])
        } else {
          reject([400, "Cannot get shippers"])
        }
      })
    })
  })

  mock.onGet(url.GET_TRUCKING_CUSTOMERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (truckingCustomers) {
          // Passing fake JSON data as response
          resolve([200, truckingCustomers])
        } else {
          reject([400, "Cannot get shippers"])
        }
      })
    })
  })

  mock.onGet(url.GET_TRUCKS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (trucks) {
          // Passing fake JSON data as response
          resolve([200, trucks])
        } else {
          reject([400, "Cannot get trucks"])
        }
      })
    })
  })

  
}

export default fakeBackend
