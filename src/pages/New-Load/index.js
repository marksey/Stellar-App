import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { isEmpty, size } from "lodash"
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

//common
import AddLoadForm from "../Forms/FormElements/TextualInputs"

//Driver and Company search
import SelectSearch from 'react-select-search';

import {
  getLoads,
  getDrivers,
  getCustomers
} from "store/actions"



class FormElements extends Component {
  constructor(props) {
    super(props)


    this.state = {
      driversList: [],
      loadsList: [],
      newLoad: {
        loadNum: 0,
        loadNumGood: true
      },
      brokerOptions: [
        {
          type: "group",
          name: "Atlanta",
          items: [
            { name: "Broker One", value: "Broker One" },
            { name: "Broker Two", value: "Broker Two" }
          ]
        },
        {
          type: "group",
          name: "Charleston",
          items: [
            { name: "Broker Three", value: "Broker Three" },
            { name: "Broker Four", value: "Broker Four" },
            { name: "Broker Five", value: "Broker Five" }
          ]
        },
        {
          type: "group",
          name: "Inactive",
          items: [{ name: "Inactive Broker", value: "Inactive Broker" }]
        }
      ],
    driverOptions: [],
     
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

  handleBrokerNameChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.brokerName  = event;
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

  handleDriverChanged(event) {

    const { driversList, loadsList } = this.props

    var selectedDriver = event


    console.log("Chose: " + selectedDriver)

    let matchingDriver = driversList.find(driver => driver.name === selectedDriver);

    console.log("Found a matching driver! ")
    console.log(matchingDriver)

    var newLoad = this.state.newLoad;
    newLoad.driver  = selectedDriver;
    newLoad.cellNum = matchingDriver.cellNum;
    newLoad.truckNum = matchingDriver.truckNum;
    newLoad.trailerNum = matchingDriver.trailerNum;

    this.setState({ newLoad: newLoad });

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

  handlePickUpCompanyChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.pickupCompany  = event;

    this.setState({ newLoad: newLoad });
    console.log("Changed:" + newLoad.companyName)
  }

  handleDeliveryCompanyChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.deliveryCompany  = event;

    this.setState({ newLoad: newLoad });
  }

  handlePickUpDateandTimeChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.pickUpDateandTime  = event.target.value;

    this.setState({ newLoad: newLoad });
  }

  handleDeliveryDateandTimeChanged(event) {
    var newLoad        = this.state.newLoad;
    newLoad.deliveryDateandTime  = event.target.value;

    this.setState({ newLoad: newLoad });
  }
  

  handleLoadSubmit(event) {
    console.log("Ok here's the newLoad!")
    console.log(this.state.newLoad);
    event.preventDefault();
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

  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    )

    this.setState({ selectedFiles: files })
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
        return this.state.companyOptions;
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
      this.setState({ newLoad: newLoad });
    
  }

  componentDidMount() {

    const { driversList, 
            loadsList, 
            onGetDrivers, 
            onGetLoads 
          } = this.props
    
    //Get drivers from DB!
    if (driversList && !driversList.length) {
      onGetDrivers(); 
    }

    //Get loads from DB!
    if (loadsList && !loadsList.length) {
      onGetLoads()
    }
  
    this.setState({ driversList })
    this.setState({ loadsList })

    {/*
    
       
    var newLoad = this.state.newLoad;
    var newLoadNum  = Math.floor(Math.random() * 1000) + 1;
    newLoad.loadNum  = newLoadNum
    this.setState({ newLoad: newLoad });
  
    this.loadNumExists(loadsList, newLoadNum)
    */}

  }

  //Sets the driver options list to the right format for SelectSearch to read data
  setDriverOptionsList(driversList){

    const driverNames = [];


    Object.entries(driversList).map(([key, value]) => {
      // Pretty straightforward - use key for the key and value for the value.
      // Just to clarify: unlike object destructuring, the parameter names don't matter here.
      driverNames.push(value['name'])
    })

    //Sort the drivers alphabetically
    const driverNamesSorted = driverNames.sort(function(a, b) {
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    })

  const driverOptionsListArr = [];
  var previousLetter = ""
  
  let indexOfFirstLetter = -1

  //This builds the driverOptions state in the right format
  //so that driver selectsearch can accept the correct driver data
  //see very bottom of code to see required driverOptions format
  for (let key in driverNamesSorted){
    var driverName = driverNamesSorted[key]
    var firstLetterOfName = driverName[0].toUpperCase()
  if (firstLetterOfName !== previousLetter){
    indexOfFirstLetter = indexOfFirstLetter + 1
    driverOptionsListArr.push({
      type: "group", 
      name : firstLetterOfName, 
      items: [{ name: driverName, value: driverName}],
      })
  } else {
    driverOptionsListArr[indexOfFirstLetter].items.push({name: driverName, value: driverName})
  }
    previousLetter = firstLetterOfName
  }      

  //Got the right format. Now set the state
  this.setState({driverOptions: driverOptionsListArr})
    
  }

  // eslint-disable-next-line no-unused-vars
  //called when component updates
  componentDidUpdate(prevProps, prevState, snapshot) {

    const { driversList, loadsList } = this.props

    //Set the driversList state to the drivers now that the component updated
    if (!isEmpty(driversList) && size(prevProps.driversList) !== size(driversList)) {
      this.setState({ driversList: {}}) //Not sure how this actually sets the driversList. Look into it later
      this.setDriverOptionsList(driversList)
    }

    //Set the loadsList state to the loads now that the component updated
    //Assigning a random load # and making sure it doesn't already exist!
    if (!isEmpty(loadsList) && size(prevProps.loadsList) !== size(loadsList)) {
      this.setState({ loadsList: {}}) //Not sure how this actually sets the loadsList. Look into it later

      var newLoad = this.state.newLoad;
      var newLoadNum  = Math.floor(Math.random() * 13) + 1;
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
                          <SelectSearch 
                            options={this.state.driverOptions} 
                            filterOptions={this.handleDriverFilter}
                            search 
                            value="" 
                            name="language" 
                            placeholder="Search for a driver" 
                            onChange={this.handleDriverChanged.bind(this)}
                          />
                        {/*
                          <input className="form-control" onChange={this.handleDriverChanged.bind(this)} list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                          <datalist id="datalistOptions">
                            <option value="Vasya Kishchenko" />
                            <option value="Steve Madden" />
                            <option value="Justin Moser" />
                            <option value="Samuel Mikhalchuk" />
                            <option value="Alex Moskov" />
                            <option value="Jamal Burnett" />
                            <option value="Oleg Sivorsky" />
                          </datalist>
                           */}
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
                          <SelectSearch 
                              options={this.state.companyOptions} 
                              filterOptions={this.handleCompanyFilter}
                              search 
                              value="" 
                              name="language" 
                              placeholder="Search for a company" 
                              onChange={this.handlePickUpCompanyChanged.bind(this)}
                            />
                            {/* 
                            <input className="form-control" onChange={this.handlePickUpCompanyChanged.bind(this)} list="companyListOptions" id="exampleDataList" placeholder="Type to search..." />
                            <datalist id="companyListOptions">
                              <option value="A Limited Inc" />
                              <option value="B Limited Ltd" />
                              <option value="C Limited Company" />
                              <option value="D Shippers Firm" />
                              <option value="E Truckers Inc" />
                            </datalist>
                            */}
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
                            value=""
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
                        <SelectSearch 
                              options={this.state.companyOptions} 
                              filterOptions={this.handleCompanyFilter}
                              search 
                              value="" 
                              name="language" 
                              placeholder="Search for a company" 
                              onChange={this.handleDeliveryCompanyChanged.bind(this)}
                            />
                            {/* 
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                              placeholder="Company Name"
                            />
                            */}
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
  onGetLoads: PropTypes.func,
  onGetDrivers: PropTypes.func
}

 

function mapStateToProps(state) {


  {/*
  var driverOptionsList = []
  var previousLetter = ""
  var previousKey = 0
  
  console.log("Init state: ")
  console.log(driverOptionsList)

  
  for (let key in driverNamesSorted){
    console.log(driverNamesSorted[key])
    var driverName = driverNamesSorted[key]
    var firstLetterOfName = driverName[0]
    console.log(firstLetterOfName)

  
  if (firstLetterOfName !== previousLetter){
    console.log("prevLetter: " + previousLetter + " firstLetter: " + firstLetterOfName)
    driverOptionsList.push({
      type: "group", 
      name : firstLetterOfName, 
      items: { name: driverName, value: driverName },
      })
      console.log("pushing array: ")
      console.log(driverOptionsList)
  } else {
    console.log("Same letters!: " + "key: " + parseInt(key) + "prev key: " + previousKey + " array:" + driverOptionsList[0])
    //driverOptionsListArray[key].items.push({name: driverName, value: driverName})
    previousKey = previousKey + 1
    console.log("whole array:")
    console.log(driverOptionsList)
  }
    previousLetter = firstLetterOfName
  }      
  */}                



  const props = { 
    driversList: state.contacts.drivers,
    loadsList: state.ecommerce.loads,

  };

  return props;
}

const mapDispatchToProps = dispatch => ({
  onGetDrivers: () => dispatch(getDrivers()),
  onGetLoads: () => dispatch(getLoads()),
  
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