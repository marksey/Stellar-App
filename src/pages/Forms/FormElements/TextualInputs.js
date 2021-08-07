import React, { Component } from "react"
import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

//Import Images
import images from "../../../assets/images"

export default class TextualInputs extends Component {
  render() {
    return (

      <div style={{width:'60%', marginLeft: 'auto', marginRight: 'auto'}}>
        <Card>
          <CardBody>
            <CardTitle className="h4">Load Info</CardTitle>
            <p className="card-title-desc">
              Please enter the load info below.
            </p>

            <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Load #
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="example-search-input"
                className="col-md-2 col-form-label"
              >
                Truck #
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="example-email-input"
                className="col-md-2 col-form-label"
              >
                Trailer #
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="exampleDataList" className="col-md-2 col-form-label">Driver</label>
              <div className="col-md-10">
                <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                <datalist id="datalistOptions">
                  <option value="Vasya Kishchenko" />
                  <option value="Steve Madden" />
                  <option value="Justin Moser" />
                  <option value="Samuel Mikhalchuk" />
                  <option value="Alex Moskov" />
                  <option value="Jamal Burnett" />
                  <option value="Oleg Sivorsky" />
                </datalist>
              </div>
            </div>

          
            <div className="mb-3 row">
              <label
                htmlFor="example-tel-input"
                className="col-md-2 col-form-label"
              >
                Phone
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="tel"
                  defaultValue="1-(555)-555-5555"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="example-password-input"
                className="col-md-2 col-form-label"
              >
                DL Picture
              </label>
              <div class="col-md-10">
                <img alt="" src={images.avatar2} class=" avatar-sm"></img>
              </div>
            </div>

            <br></br>

            <CardTitle className="h4">Pickup Info</CardTitle>
            <p className="card-title-desc">
              Please enter the pickup info below.
            </p>
          
            <div className="mb-3 row">
              <label
                htmlFor="example-datetime-local-input"
                className="col-md-2 col-form-label"
              >
                Date & Time
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="datetime-local"
                  defaultValue="2019-08-19T13:45:00"
                  id="example-datetime-local-input"
                />
              </div>
            </div>
            
            
            <div className="mb-3 row">
              <label
                htmlFor="example-url-input"
                className="col-md-2 col-form-label"
              >
                Address
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>
            
            <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                City
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-md-2 col-form-label">State</label>
              <div className="col-md-10">
                <select className="form-select">
                  <option>Alaska</option>
                  <option>Alabama</option>
                  <option>California</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Zip Code
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>

            <br></br>
            <br></br>

            <CardTitle className="h4">Delivery Info</CardTitle>
            <p className="card-title-desc">
              Please enter the delivery info below.
            </p>

            <div className="mb-3 row">
              <label
                htmlFor="example-datetime-local-input"
                className="col-md-2 col-form-label"
              >
                Date & Time
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="datetime-local"
                  defaultValue="2019-08-19T13:45:00"
                  id="example-datetime-local-input"
                />
              </div>
            </div>
            
            
            <div className="mb-3 row">
              <label
                htmlFor="example-url-input"
                className="col-md-2 col-form-label"
              >
                Address
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>
            
            <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                City
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-md-2 col-form-label">State</label>
              <div className="col-md-10">
                <select className="form-select">
                  <option>Alaska</option>
                  <option>Alabama</option>
                  <option>California</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Zip Code
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>
            
            <br></br>
            <br></br>

            <CardTitle className="h4">Customer Info</CardTitle>
            <p className="card-title-desc">
              Please enter the customer info below.
            </p>

            <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Broker Name
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Rate
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                />
              </div>
            </div>

            <br></br>
            <div style={{float: 'right'}}>
              <button class="btn btn-success" >Submit</button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }
}
