import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { isEmpty, size } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { AvForm, AvField } from "availity-reactstrap-validation"
import { Link } from "react-router-dom"
import * as moment from 'moment';

import { Button, Card, CardBody, Row, Col, Badge, Modal, ModalHeader, ModalBody } from "reactstrap"


import {
  getLoads,
  getDrivers
} from "store/actions"

import EcommerceOrdersModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

//Driver search
import SelectSearch from 'react-select-search';


class AvailableFreightList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewmodal: false,
      modal: false,
      loads: [],
      newLoad: [],
      viewAssignDriverModal: false,
      driversList: [],
      driverOptions: [],
      EcommerceOrderColumns: [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
          formatter: (cellContent, row) => (
            <>
              {row.id}
            </>
          ),
        },
        {
          dataField: "driver",
          text: "Driver",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.driver}
            </>
          ),
        },
        {
          dataField: "tripNum",
          text: "Ref #",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.loadNum}
            </>
          ),
        },
        {
          dataField: "truckNum",
          text: "Truck #",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "trailerNum",
          text: "Trailer #",
          sort: true,    
          filter: textFilter(),     
        },
        {
          dataField: "customer",
          text: "Customer",
          sort: true,
          filter: textFilter(),

          //This can provide coloration to the cells. Maybe for warning or emphasis on pickup date.
          //formatter: (cellContent, row) => (
           // <Badge
            //  className={"font-size-12 badge-soft-" + row.badgeclass}
           //   color={row.badgeclass}
           //   pill
           // >
           //   {row.paymentStatus}
           // </Badge>
          //),
        },
        
        {
          dataField: "pickupDateandTime",
          isDummyField: true,
          text: "Pickup",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.pickupCityAndState} <div></div> {row.pickupDateAndTime}
            </>
          ),
            /* 
            <>
              <i className={
                (row.paymentMethod !== 'COD') ?
                  'fab fa-cc-' + this.toLowerCase1(row.paymentMethod) + " me-1"
                  : 'fab fas fa-money-bill-alt me-1'
              } />{" "}
              {row.paymentMethod}
            </>
          ),
          */
        },
        {
          dataField: "deliveryDateandTime",
          isDummyField: true,
          text: "Delivery",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.deliveryCityAndState} <div></div> {row.deliveryDateAndTime}
            </>
          ),
        },
        {
          dataField: "loadRate",
          isDummyField: true,
          text: "Rate",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <>
              <h6 class="mb-0 text-success">{row.loadRate}</h6>  
            </>
          ),
        },
        {
          dataField: "loadBooked",
          isDummyField: true,
          text: "Add Driver",
          sort: true,
          formatter: (cellContent, load) => (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => this.toggleAssignDriverModal(load)}
            >
              Assign Driver
            </Button>
          ),
        },
        {
          dataField: "loadActions",
          isDummyField: true,
          text: "Actions",
          sort: true,
          editable: false,
          formatter: (cellContent, load) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => this.handleUserClick(load)}></i></Link>
              <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => this.handleDeleteUser(load)}></i></Link>
            </div>
          ),
        }
      ]
    }

    this.toggle = this.toggle.bind(this)
    this.toggleCloseAssignDriver = this.toggleCloseAssignDriver.bind(this)
    this.toggleAssignDriverModal = this.toggleAssignDriverModal.bind(this)
    this.toLowerCase1 = this.toLowerCase1.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
  }

  toLowerCase1(str) {
    return str.toLowerCase();
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

  componentDidMount() {

    const { loads, 
            driversList, 
            onGetLoads, 
            onGetDrivers 
          } = this.props
    
   
    //Get drivers from DB!
    if (driversList && !driversList.length) {
      onGetDrivers(); 
    }

   
    onGetLoads()

    
    
    
    this.setState({ loads })
    this.setState({ driversList })

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
  componentDidUpdate(prevProps, prevState, snapshot) {

    const { loads, driversList } = this.props
   
    if (!isEmpty(loads) && size(prevProps.loads) !== size(loads)) {
      this.setState({ loads: {}, isEdit: false })
    }

    //Set the driversList state to the drivers now that the component updated
    if (!isEmpty(driversList) && size(prevProps.driversList) !== size(driversList)) {
      console.log("Setting the options list!")
      this.setState({ driversList: {}}) //Not sure how this actually sets the driversList. Look into it later
      this.setOptionsList(driversList, "drivers")
    }

    console.log("Setting the options list again")
  
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  toggleCloseAssignDriver() {

    //Clear driversList on close
    this.setState({ driversList: []})

    this.setState({viewAssignDriverModal: !this.state.viewAssignDriverModal})
  }

  toggleAssignDriverModal = arg => {

    const load = arg

    console.log("Here is the load in the loads list!")
    console.log(load)

    this.setState({
        
      loads: {
        driver: load.driver,
        tripNum: load.tripNum,
        truckNum: load.truckNum,
        trailerNum: load.trailerNum,
        customer: load.customer,
        pickupCityAndState: load.pickupCityAndState,
        deliveryCityAndState: load.deliveryCityAndState,
        loadRate: load.loadRate,
        loadNum: load.loadNum,
      }
    })

    this.setState({viewAssignDriverModal: !this.state.viewAssignDriverModal})
  }


  toggleViewModal = () => {
    this.setState(prevState => ({
      viewmodal: !prevState.viewmodal,
    }))
  }

  format(cell, row){
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  handleUserClick = arg => {
    const load = arg

    console.log("Here is the load in the loads list!")
    console.log(load)

    this.setState({
        
      loads: {
        driver: load.driver,
        tripNum: load.tripNum,
        truckNum: load.truckNum,
        trailerNum: load.trailerNum,
        customer: load.customer,
        pickupCityAndState: load.pickupCityAndState,
        deliveryCityAndState: load.deliveryCityAndState,
        loadRate: load.loadRate,
        loadNum: load.loadNum,
      },
      isEdit: true,
    })

    this.toggle()
  }

  render() {
    const { loads } = this.props
    const { isEdit } = this.state


    //pagination customization
    const pageOptions = {
      sizePerPage: loads.length,
      totalSize: loads.length, // replace later with size(Order),
      custom: true,
    }

    const defaultSorted = [{
      dataField: 'deliveryDateAndTime',
      order: 'desc'
    }];

    const selectRow = {
      mode: 'checkbox',
    };

    return (
      <React.Fragment>
        <EcommerceOrdersModal
          isOpen={this.state.viewmodal}
          toggle={this.toggleViewModal}
        />
        <Card>
          <CardBody>

            <div className="mb-4 h4 card-title">
              Not Yet Assigned A Driver
              <a href="new-load">
                <button class="btn btn-success" style={{float: "right", marginTop: "-0.5%"}}>
                  <i className="mdi mdi-plus-circle-outline me-1" />
                  Add Load
                  </button>
              </a>
            </div>
              
              
            
            <PaginationProvider
              pagination={paginationFactory(pageOptions)}
              keyField='id'
              columns={this.state.EcommerceOrderColumns}
              data={loads}
            >
              {({ paginationProps, paginationTableProps }) => (

                <ToolkitProvider
                  keyField="id"
                  data={loads}
                  columns={this.state.EcommerceOrderColumns}
                  bootstrap4
                  search
                >
                  {toolkitProps => (
                    <React.Fragment>
                      <div className="table-responsive">
                        <BootstrapTable
                          {...toolkitProps.baseProps}
                          {...paginationTableProps}
                          responsive
                          defaultSorted={defaultSorted}
                          bordered={true}
                          striped={true}
                          filter={ filterFactory() }
                          filterPosition="top"
                          selectRow={selectRow}
                          classes={
                            "table align-middle table-nowrap table-check"
                          }
                          headerWrapperClasses={"table-light"}
                        />
                      </div>

                      <Modal
                          isOpen={this.state.viewAssignDriverModal}
                          className = 'modal-dialog modal-dialog-scrollable'
                          //className={this.props.className}
                        >
                          <ModalHeader toggle={this.toggleCloseAssignDriver} tag="h4">
                            Assign Driver to Ref # {this.state.loads.loadNum}
                          </ModalHeader>
                          <ModalBody>
                            <AvForm
                              onValidSubmit={
                                this.handleValidUserSubmit
                              }
                            >
                              <Row form>
                                <Col className="col-12">

                                  <div className="mb-3">
                                    <h6>Driver</h6>
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

                                  <div className="mb-3">
                                    <AvField
                                      name="phone"
                                      label="Phone #"
                                      type="text"
                                      errorMessage="Invalid Phone"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.driversList.phone || ""}
                                    />
                                  </div>

                                  <div className="mb-3">

                                    <AvField
                                      name="carrier"
                                      label="Truck #"
                                      type="text"
                                      errorMessage="Invalid Truck #"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.driversList.truckNum || ""}
                                    />
                                  </div>

                                  
                                  <div className="mb-3">
                                    <AvField
                                      name="owner"
                                      label="Trailer #"
                                      type="text"
                                      errorMessage="Invalid Owner"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.driversList.trailerNum || ""}
                                    />
                                  </div>

                                

                                </Col>

                              </Row>
                              <Row>
                                <Col>
                                  <div className="text-end">

                                    <button
                                      type="submit"
                                      className="btn btn-success save-user"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </AvForm>
                          </ModalBody>
                        </Modal>

                      <Modal
                          isOpen={this.state.modal}
                          className = 'modal-dialog modal-dialog-scrollable'
                          //className={this.props.className}
                        >
                          <ModalHeader toggle={this.toggle} tag="h4">
                            {!!isEdit ? "Edit load" : "Add Truck"}
                          </ModalHeader>
                          <ModalBody>
                            <AvForm
                              onValidSubmit={
                                this.handleValidUserSubmit
                              }
                            >
                              <Row form>
                                <Col className="col-12">

                                  <div className="mb-3">
                                    <AvField
                                      name="driver"
                                      label="Driver"
                                      type="text"
                                      errorMessage="Invalid driver"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.driver || ""}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <AvField
                                      name="age"
                                      label="Ref #"
                                      type="text"
                                      errorMessage="Invalid age"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.loadNum || ""}
                                    />
                                  </div>

                                  <div className="mb-3">

                                    <AvField
                                      name="carrier"
                                      label="Truck #"
                                      type="text"
                                      errorMessage="Invalid Truck #"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.truckNum || ""}
                                    />
                                  </div>

                                  
                                  <div className="mb-3">
                                    <AvField
                                      name="owner"
                                      label="Trailer #"
                                      type="text"
                                      errorMessage="Invalid Owner"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.trailerNum || ""}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <AvField
                                      name="make"
                                      label="Customer"
                                      type="text"
                                      errorMessage="Invalid Make"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.customer || ""}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <AvField
                                      name="plateNum"
                                      label="Pickup"
                                      type="text"
                                      errorMessage="Invalid Plate #"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.pickupCityAndState || ""}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <AvField
                                      name="state"
                                      label="Delivery"
                                      type="text"
                                      errorMessage="Invalid Delivery"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.deliveryCityAndState || ""}
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <AvField
                                      name="vinNum"
                                      label=" Rate"
                                      type="text"
                                      errorMessage="Invalid Load Rate"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.loadRate || ""}
                                    />
                                  </div>

                                </Col>

                              </Row>
                              <Row>
                                <Col>
                                  <div className="text-end">

                                    <button
                                      type="submit"
                                      className="btn btn-success save-user"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </AvForm>
                          </ModalBody>
                        </Modal>

                    
                      {/*
                      <Row className="align-items-md-center mt-30">
                        <Col className="inner-custom-pagination d-flex">
                            <div className="d-inline">
                                <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                />
                            </div>
                        
                            <div className="pagination pagination-rounded text-md-right ms-auto">
                                <PaginationListStandalone
                                    {...paginationProps}
                                />
                            </div>
                        </Col>
                      </Row>
                      */}
                      
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              )}
            </PaginationProvider>
          </CardBody>
        </Card>

        

      </React.Fragment>
    )
  }
}

AvailableFreightList.propTypes = {
  loads: PropTypes.array,
  onGetLoads: PropTypes.func,
  driversList: PropTypes.array
}

function mapStateToProps(state) {
  
  var loads = state.ecommerce.loads

  var availableFreight = []
  
  //When you receive the loads from getLoads()
  //remove the ones that have a driver assigned
  if(loads.length > 0){

    for (var i=0; i <loads.length;i++){

      //No driver found. Add to available freight
      if(loads[i]['driver'] == undefined){
        availableFreight.push(loads[i])
      } 
    }
  }


  const props = { 
    loads: availableFreight,
    driversList: state.contacts.drivers 
  };
  return props;
}

{/*
const mapStateToProps = state => ({
  loads: state.ecommerce.loads,
})
*/}


const mapDispatchToProps = dispatch => ({
  onGetLoads: () => dispatch(getLoads()),
  onGetDrivers: () => dispatch(getDrivers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AvailableFreightList))