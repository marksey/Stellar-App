import React, { Component } from "react"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Images
import images from "../../../assets/images"

export default class AddLoadForm extends Component {


  

  render() {

    return (

      <div style={{width:'60%', marginLeft: 'auto', marginRight: 'auto'}}>
        <Card>
          <CardBody>

          <form onSubmit={this.props.handleValidUserSubmit}> 
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
                  <input className="form-control"  list="brokerListOptions" id="exampleDataList" placeholder="Type to search..." />
                  <datalist id="brokerListOptions">
                    <option value="Acme Brokers Inc" />
                    <option value="Beta Brokers Ltd" />
                    <option value="Gamma Brokers Company" />
                    <option value="Theta Brokerage Firm" />
                    <option value="Rho Trucks Brokers" />
                  </datalist>
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

              <CardTitle className="h4">Driver Info</CardTitle>
              <p className="card-title-desc">
                Please enter the driver info below.
              </p>

              

              <div className="mb-3 row">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Ref #
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue="1337"
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
                    placeholder="1-(555)-555-5555"
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

              

              {/*
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
              */}

              <br></br>

              <CardTitle className="h4">Pickup Info</CardTitle>
              <p className="card-title-desc">
                Please enter the pickup info below.
              </p>
            
              
              <div className="mb-3 row">
                <label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  Company 
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
                    placeholder="Street Name"
                  />
                </div>
              </div>

              <div className="mb-3 row">
              <label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  
                </label>
                
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue=""
                    placeholder="City, State ZIP"
                  />
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
                    placeholder="1-(555)-555-5555"
                  />
                </div>
              </div>

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

              <br></br>
              <br></br>

              <CardTitle className="h4">Delivery Info</CardTitle>
              <p className="card-title-desc">
                Please enter the delivery info below.
              </p>

              
              <div className="mb-3 row">
                <label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  Company
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue=""
                    placeholder="Company Name"
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
                    placeholder="Street Name"
                  />
                </div>
              </div>
              
              <div className="mb-3 row">
                <label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue=""
                    placeholder="City, State ZIP"
                  />
                </div>
              </div>
            

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

              <br></br>

              <div>
                <Label className="form-label">Attach Rate Confirmation</Label>
                <div className="input-group mb-3">
                  <Input className="form-control" type="file" id="formFile" />
                </div>
              </div>

              

              <div style={{float: 'right'}}>
                <button class="btn btn-success" >Submit</button>
              </div>

            </form>
          </CardBody>
        </Card>
        

       
      </div>
    )
  }
  }

