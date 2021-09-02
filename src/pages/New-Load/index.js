import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { isEmpty, size } from "lodash"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Driver and Company search
import SelectSearch from 'react-select-search';

import {
  addNewLoad,
  getLoads,
  getDrivers,
  getTruckingCustomers,
  getShippers,
} from "store/actions"



class FormElements extends Component {
  constructor(props) {
    super(props)


    this.state = {
      sweetTimerLength: 3000, //3 seconds
      sweet_timer: false,
      selectedFiles: [],
      driversList: [],
      loadsList: [],
      brokersList: [],
      shippersList: [],
      receiversList: [],
      newLoad: {
        loadNum: 0,
        loadNumGood: true
      },
      brokerOptions: [],
      driverOptions: [],
      shipperOptions: [], //Change shipper options to companyOptions. Combine shippers/receivers
      companyOptions: [
        {
          type: "group",
          name: "Atlanta",
          items: [
            { name: "Company One", value: "Company One" },
            { name: "Company Two", value: "Company Two" }
          ]
        },
        {
          type: "group",
          name: "Charleston",
          items: [
            { name: "Company Three", value: "Company Three" },
            { name: "Company Four", value: "Company Four" },
            { name: "Company Five", value: "Company Five" }
          ]
        },
        {
          type: "group",
          name: "Inactive",
          items: [{ name: "Inactive Company", value: "Inactive Company" }]
        }
      ],
  }
}


  //Form handlers
  //Right now broker and customer are the same when adding a load!
  //Look into this later! May need additional field on new load form (Is the broker the customer?)
  handleBrokerNameChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.brokerName  = event;
    newLoad.customer  = event;
    this.setState({ newLoad: newLoad });
  }

  handleLoadRateChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.loadRate  = event.target.value;

    this.setState({ newLoad: newLoad });
  }

  handleLoadNumberChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.loadRate  = event.target.value;

    this.setState({ newLoad: newLoad });

  }

  handleDeliveryCompanyChanged(event) {

    const { shippersList } = this.props

    var selectedCompany = event
    
    var newLoad        = this.state.newLoad;
    newLoad.deliveryCompany  = selectedCompany;

    let matchingReceiver = shippersList.find(shipper => shipper.name === selectedCompany);

    console.log("Found a matching receiver! ")
    console.log(matchingReceiver)

    //Set the load state which will be passed during the POST submit
    newLoad.deliveryStreetName = matchingReceiver.streetName

    var City = matchingReceiver.cityStateZip.split(", ")[0]
    var State = matchingReceiver.cityStateZip.split(", ")[1].split(" ")[0]
    var Zip = matchingReceiver.cityStateZip.split(", ")[1].split(" ")[1]

    var cityAndState = City + ", " + State

    newLoad.deliveryCityAndState = cityAndState;
    newLoad.deliveryZipCode = Zip;

    console.log("Setting new load state in delivery company!")
    console.log(newLoad)
    //Set the load state which will be passed during the POST submit
    this.setState({ newLoad: newLoad });


    //Auto populate the company address and phone
    //This will auto render on the input fields below company
    this.setState({
      receiversList: {
        streetName: matchingReceiver.streetName,
        cityStateZip: matchingReceiver.cityStateZip,
        phone: matchingReceiver.phone,     
      }
    })
  }

  handlePickUpCompanyChanged(event) {

    const { shippersList } = this.props

    var selectedCompany = event
    
    var newLoad        = this.state.newLoad;
    newLoad.pickupCompany  = selectedCompany;

    let matchingShipper = shippersList.find(shipper => shipper.name === selectedCompany);

    console.log("Found a matching shipper! ")
    console.log(matchingShipper)

    //Set the load state which will be passed during the POST submit
    newLoad.pickupStreetName = matchingShipper.streetName

    var City = matchingShipper.cityStateZip.split(", ")[0]
    var State = matchingShipper.cityStateZip.split(", ")[1].split(" ")[0]
    var Zip = matchingShipper.cityStateZip.split(", ")[1].split(" ")[1]

    var cityAndState = City + ", " + State


    newLoad.pickupCityAndState = cityAndState
    newLoad.pickupZipCode = Zip

    newLoad.pickupPhone = matchingShipper.phone
    
    this.setState({ newLoad: newLoad });
    console.log("Load state after pickup company set")
    console.log(this.state.newLoad)

    //Auto populate the company address and phone
    //This will auto render on the input fields below company
    this.setState({
      shippersList: {
        streetName: matchingShipper.streetName,
        cityStateZip: matchingShipper.cityStateZip,
        phone: matchingShipper.phone,     
      }
    })

  }

  handleDriverChanged(event) {

    const { driversList } = this.props

    var selectedDriver = event


    console.log("Chose: " + selectedDriver)

    let matchingDriver = driversList.find(driver => driver.name === selectedDriver);

    console.log("Found a matching driver! ")
    console.log(matchingDriver)

    var newLoad = this.state.newLoad;
    newLoad.driver  = selectedDriver;
    newLoad.driverCellNum = matchingDriver.cellNum;
    newLoad.truckNum = matchingDriver.truckNum;
    newLoad.trailerNum = matchingDriver.trailerNum;

    //Set the load state which will be passed during the POST submit
    this.setState({ newLoad: newLoad });

    //Auto populate the phone, truck and trailer #
    //This will auto render on the input fields below driver
    this.setState({
      driversList: {
        phone: matchingDriver.cellNum,
        truckNum: matchingDriver.truckNum,
        trailerNum: matchingDriver.trailerNum,     
      }
    })
   
  }

  handleTruckNumChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.truckNum  = event.target.value;

    this.setState({ newLoad: newLoad });
  }

  handleTrailerNumChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.trailerNum  = event.target.value;

    this.setState({ newLoad: newLoad });
  }



  handlePickUpDateandTimeChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.pickupDateAndTime  = event.target.value;

    this.setState({ newLoad: newLoad });
  }

  handleDeliveryDateandTimeChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.deliveryDateAndTime  = event.target.value;

    this.setState({ newLoad: newLoad });
  }
  

  handleLoadSubmit(event) {
    event.preventDefault();
    console.log("Ok here's the newLoad!")
    console.log(this.state.newLoad);

    this.setState({ sweet_timer: true })

    const {onAddNewLoad} = this.props //Not sure what this does. Look into it

    
    onAddNewLoad(this.state.newLoad)

    
    //Redirect user back to dashboard after submitting load 
    //and after sweet alert closes
    //Pass in showGreenBar and new load ID to figure out which
    //row will be set rowClass "table-success" in dashboard load table
    setTimeout(() => {
      this.props.history.push({
        pathname: '/available-freight',
        state: { showGreenBar: true, rowId: this.state.newLoad.id }
      })
    }, this.state.sweetTimerLength)
    
    

   }
  

  /**
   * Handling submit newLoad on new newLoad form
   */
   handleValidUserSubmit = (e, values) => {
    const { onAddNewUser, onUpdateUser } = this.props
    const { isEdit, drivers, selectedUser } = this.state

    if (isEdit) {
      const updateUser = {
        id: drivers.id,
        name: values.name,
        designation: values.designation,
        tags: values.tags,
        email: values.email,
        projects: values.projects
      }

      // update driver
      onUpdateUser(updateUser)
    } else {

      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        designation: values["designation"],
        email: values["email"],
        tags: values["tags"],
        projects: values["projects"]
      }
      // save new driver
      onAddNewUser(newUser)
    }
    this.setState({ selectedUser: null })
    this.toggle()
  }

  //Only sets the file name. Doesn't add the actual file.
  //Must fix this for production code
  handleAcceptedFiles = (e) => {

    // handle validations
    const file = e.target.files[0];

    this.setState({ selectedFiles: file })

    //Add the rate conf to this new load
    var newLoad = this.state.newLoad;
    newLoad.rateConfirmation = file['name']

    this.setState({ newLoad: newLoad })

  };

  handleAcceptedFilesDropZone = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    )

    
  }

  /**
   * Formats the size
   */
   formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  //Handle Filters. Eventually just combine into one function!
  handleBrokerFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return this.state.brokerOptions;
      }
      const updatedItems = items.map((list) => {
        const newItems = list.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        return { ...list, items: newItems };
      });
      return updatedItems;
    };
  };

  handleDriverFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return this.state.driverOptions;
      }
      const updatedItems = items.map((list) => {
        const newItems = list.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        return { ...list, items: newItems };
      });
      return updatedItems;
    };
  };


  handleCompanyFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return this.state.shipperOptions;
      }
      const updatedItems = items.map((list) => {
        const newItems = list.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        return { ...list, items: newItems };
      });
      return updatedItems;
    };
  };
  

  loadNumExists(data, val) {

      for (var i=0; i <data.length;i++){

        if(data[i]['loadNum'] == val){
          var newLoad = this.state.newLoad;
          newLoad.loadNumGood  = false
          this.setState({ newLoad: newLoad });
          return
        } 

      }

      var newLoad = this.state.newLoad;
      newLoad.loadNum = val
      newLoad.loadNumGood  = true
      newLoad.id = val
      this.setState({ newLoad: newLoad });
    
  }

  componentDidMount() {

    const { driversList, 
            loadsList, 
            brokersList,
            shippersList,
            onGetDrivers, 
            onGetLoads,
            onGetBrokers,
            onGetShippers
          } = this.props
    
    //Get drivers from DB!
    if (driversList && !driversList.length) {
      onGetDrivers(); 
    }

    //Get loads from DB!
    if (loadsList && !loadsList.length) {
      onGetLoads()
    }

    //Get brokers from DB!
    if (brokersList && !brokersList.length) {
      onGetBrokers()
    }

     //Get shippers from DB!
     if (shippersList && !shippersList.length) {
      onGetShippers()
    }
  
    this.setState({ driversList })
    this.setState({ loadsList })
    this.setState({ brokersList })
    this.setState({ shippersList })

    {/*
    
       
    var newLoad = this.state.newLoad;
    var newLoadNum  = Math.floor(Math.random() * 1000) + 1;
    newLoad.loadNum  = newLoadNum
    this.setState({ newLoad: newLoad });
  
    this.loadNumExists(loadsList, newLoadNum)
    */}

  }

  //Sets the options list to the right format for SelectSearch to read data
  //Takes in the type (broker, driver, shipper or receiver) and the data (list)
  //Eventually pull this into its own file and import for reusability
  setOptionsList(list, type){

    const namesList = [];


    Object.entries(list).map(([key, value]) => {
      // Pretty straightforward - use key for the key and value for the value.
      // Just to clarify: unlike object destructuring, the parameter names don't matter here.
      namesList.push(value['name'])
    })

    //Sort the drivers alphabetically
    const namesListSorted = namesList.sort(function(a, b) {
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    })

  const optionsListArr = [];
  var previousLetter = ""
  
  let indexOfFirstLetter = -1

  //This builds the driverOptions state in the right format
  //so that driver selectsearch can accept the correct driver data
  //see very bottom of code to see required driverOptions format
  for (let key in namesListSorted){
    var currentName = namesListSorted[key]
    var firstLetterOfName = currentName[0].toUpperCase()
  if (firstLetterOfName !== previousLetter){
    indexOfFirstLetter = indexOfFirstLetter + 1
    optionsListArr.push({
      type: "group", 
      name : firstLetterOfName, 
      items: [{ name: currentName, value: currentName}],
      })
  } else {
    optionsListArr[indexOfFirstLetter].items.push({name: currentName, value: currentName})
  }
    previousLetter = firstLetterOfName
  }      

  console.log("Type: " + type)
  console.log(optionsListArr)

  switch(type) {
    case 'brokers':
      console.log("Inside switch:")
      console.log("Chose brokers!!!")
      this.setState({brokerOptions: optionsListArr})
      return;
    case 'drivers':
      console.log("Inside switch:")
      console.log("Chose drivers!!!")
      this.setState({driverOptions: optionsListArr})
      return;
    case 'shippers':
      console.log("Inside switch:")
      console.log("Chose shipper!!!")
      this.setState({shipperOptions: optionsListArr})
      return;
    case 'receivers':
      console.log("Inside switch:")
      console.log("Chose receiver!!!")
      return;
    default:
      console.log("Inside switch:")
      console.log("Different type")
      return;
  }

  //Got the right format. Now set the state
  //
    
  }


  // eslint-disable-next-line no-unused-vars
  //called when component updates
  componentDidUpdate(prevProps, prevState, snapshot) {

    const { driversList, loadsList, brokersList, shippersList } = this.props

    //Set the driversList state to the drivers now that the component updated
    if (!isEmpty(driversList) && size(prevProps.driversList) !== size(driversList)) {
      this.setState({ driversList: {}}) //Not sure how this actually sets the driversList. Look into it later
      this.setOptionsList(driversList, "drivers")
    }

    //Set the brokerList state to the drivers now that the component updated
    if (!isEmpty(brokersList) && size(prevProps.brokersList) !== size(brokersList)) {
      this.setState({ brokersList: {}}) //Not sure how this actually sets the brokersList. Look into it later
      this.setOptionsList(brokersList, "brokers")
    }

    //Set the shippersList state to the drivers now that the component updated
    if (!isEmpty(shippersList) && size(prevProps.shippersList) !== size(shippersList)) {
      this.setState({ shippersList: {}}) //Not sure how this actually sets the shippersList. Look into it later
      this.setOptionsList(shippersList, "shippers")
    }

    //Set the loadsList state to the loads now that the component updated
    //Assigning a random load # and making sure it doesn't already exist!
    if (!isEmpty(loadsList) && size(prevProps.loadsList) !== size(loadsList)) {
      this.setState({ loadsList: {}}) //Not sure how this actually sets the loadsList. Look into it later

      var newLoad = this.state.newLoad;
      var newLoadNum  = Math.floor(Math.random() * 1000) + 1;
      this.loadNumExists(loadsList, newLoadNum)


      var loadNumGood = this.state.newLoad.loadNumGood
    
      if(loadNumGood){
        newLoad.loadNum  = newLoadNum
        this.setState({ newLoad: newLoad });
      } else{

        while(!loadNumGood ){
        
          newLoadNum  = Math.floor(Math.random() * 13) + 1;
          this.loadNumExists(loadsList, newLoadNum)
          loadNumGood = this.state.newLoad.loadNumGood

        }
      }
    }
  
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Form Elements | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Add New Load" />

            {this.state.sweet_timer ? (
              <SweetAlert
                title="Nice job!"
                success
                timeout={this.state.sweetTimerLength}//auto close in 4 sec
                showConfirm={false}
                onConfirm={() => this.setState({ sweet_timer: false })}
              >
                Load successfully added!
              </SweetAlert>
            ) : null}

            <Row>
              <Col>
              <div style={{width:'60%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card>
                  <CardBody>

                  <form> 
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
                        <div style={{float: 'right'}}>
                          <button style={{marginTop: '5%'}} class="btn btn-info btn-sm" onClick={null}>
                          <i className="mdi mdi-plus-circle-outline me-1" />
                          Add Broker
                          </button>
                        </div>
                        <SelectSearch 
                          options={this.state.brokerOptions} 
                          filterOptions={this.handleBrokerFilter}
                          search 
                          value="" 
                          name="language" 
                          placeholder="Search for a broker" 
                          onChange={this.handleBrokerNameChanged.bind(this)}
                        />
                          {/*
                            <input className="form-control" onChange={this.handleBrokerNameChanged.bind(this)} list="brokerListOptions" id="exampleDataList" placeholder="Type to search..." />
                            <datalist contentEdiaid="brokerListOptions">                          
                              <option value="Acme Brokers Inc" />
                              <option value="Beta Brokers Ltd" />
                              <option value="Gamma Brokers Company" />
                              <option value="Theta Brokerage Firm" />
                              <option value="Rho Trucks Brokers" />
                            </datalist>
                            */}
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
                            onChange={this.handleLoadRateChanged.bind(this)}
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
                            onChange={this.handleLoadNumberChanged.bind(this)}
                            className="form-control"
                            type="text"
                            value={this.state.newLoad.loadNum}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label htmlFor="exampleDataList" className="col-md-2 col-form-label">Driver</label>
                        <div className="col-md-10">
                          <div style={{float: 'right'}}>
                            <button style={{marginTop: '5%'}} class="btn btn-info btn-sm" onClick={null}>
                            <i className="mdi mdi-plus-circle-outline me-1" />
                            Add Driver
                            </button>
                          </div>
                          <SelectSearch 
                            options={this.state.driverOptions} 
                            filterOptions={this.handleDriverFilter}
                            search 
                            value="" 
                            name="language" 
                            placeholder="Search for a driver" 
                            onChange={this.handleDriverChanged.bind(this)}
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
                            value={this.state.driversList.phone}
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
                            value={this.state.driversList.truckNum || ""}
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
                            value={this.state.driversList.trailerNum}
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
                          <div style={{float: 'right'}}>
                            <button style={{marginTop: '5%'}} class="btn btn-info btn-sm" onClick={null}>
                            <i className="mdi mdi-plus-circle-outline me-1" />
                            Add Shipper
                            </button>
                          </div>
                          <SelectSearch 
                              options={this.state.shipperOptions} 
                              filterOptions={this.handleCompanyFilter}
                              search 
                              value="" 
                              name="language" 
                              placeholder="Search for a company" 
                              onChange={this.handlePickUpCompanyChanged.bind(this)}
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
                            value={this.state.shippersList.streetName || ""}
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
                            value={this.state.shippersList.cityStateZip || ""}
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
                            value={this.state.shippersList.phone || ""}
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
                            onChange={this.handlePickUpDateandTimeChanged.bind(this)}
                            className="form-control"
                            type="datetime-local"
                            defaultValue={Date().toLocaleString()}
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
                          <div style={{float: 'right'}}>
                            <button style={{marginTop: '5%'}} class="btn btn-info btn-sm" onClick={null}>
                            <i className="mdi mdi-plus-circle-outline me-1" />
                            Add Receiver
                            </button>
                          </div>
                        <SelectSearch 
                              options={this.state.shipperOptions} 
                              filterOptions={this.handleCompanyFilter}
                              search 
                              value="" 
                              name="language" 
                              placeholder="Search for a company" 
                              onChange={this.handleDeliveryCompanyChanged.bind(this)}
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
                            value={this.state.receiversList.streetName || ""}
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
                            value={this.state.receiversList.cityStateZip || ""}
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
                            defaultValue={Date().toLocaleString()}
                            id="example-datetime-local-input"
                            onChange={this.handleDeliveryDateandTimeChanged.bind(this)}
                          />
                        </div>
                      </div>

                      <br></br>

                      <div>
                        <Label className="form-label">Attach Rate Confirmation</Label>
                        <div className="input-group mb-3">
                          <Input className="form-control" type="file" id="formFile" onChange = {this.handleAcceptedFiles} />
                        </div>
                      </div>

                      

                      <div style={{float: 'right'}}>
                        <button class="btn btn-success" onClick={this.handleLoadSubmit.bind(this)}>Submit</button>
                      </div>

                    </form>
                  </CardBody>
                </Card>
                

              
              </div>
              </Col>
            </Row>
            
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

FormElements.propTypes = {
  driversList: PropTypes.array,
  loadsList: PropTypes.array,
  brokersList: PropTypes.array,
  shippersList: PropTypes.array,
  onGetLoads: PropTypes.func,
  onGetDrivers: PropTypes.func,
  onGetBrokers: PropTypes.func,
  onGetShippers: PropTypes.func,
  onAddNewLoad: PropTypes.func,
}

 

function mapStateToProps(state) {

  console.log("inside new load. Got the drivers!")
  console.log(state.contacts.drivers)

  const props = { 
    driversList: state.contacts.drivers,
    loadsList: state.ecommerce.loads,
    brokersList: state.contacts.truckingCustomers,
    shippersList: state.contacts.shippers,
  };

  return props;
}

const mapDispatchToProps = dispatch => ({
  onGetDrivers: () => dispatch(getDrivers()),
  onGetLoads: () => dispatch(getLoads()),
  onGetBrokers: () => dispatch(getTruckingCustomers()),
  onGetShippers: () => dispatch(getShippers()),
  onAddNewLoad: load => dispatch(addNewLoad(load)),
})

//export default FormElements

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FormElements))

      
//Format notes
 {/*
      driverOptions format: [
        {
          type: "group",
          name: "A",
          items: [
            { name: "Alex Moskov", value: "Alex Moskov" },
            { name: "Andrey Shapoval", value: "Andrey Shapoval" },
          ]
        },
      ]
*/}