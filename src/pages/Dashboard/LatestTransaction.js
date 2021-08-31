import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { isEmpty, size } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Link } from "react-router-dom"
import * as moment from 'moment';

import { Button, Card, CardTitle, CardBody, Badge, Modal, ModalBody,
   ModalFooter, ModalHeader, Row, Col } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"


import {
  getLoads,
} from "store/actions"

import CompleteLoadModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"


class LatestTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showGreenBar:false,
      viewCompleteLoadModal: false,
      viewLoadDetailsModal: false,
      modal: false,
      loads: [],
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
          text: "deliveryDateAndTime",
          dataField: "deliveryDateAndTime",
          sort: true,
          hidden: true,
          formatter: (cellContent, user) => (
            <>
              {row.deliveryDateAndTime}
            </>
          ),
        },
        {
          dataField: "loadNum",
          text: "Ref Number",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <Link to="#" className="text-body fw-bold">
              {row.loadNum}
            </Link>
          ),
        },
        {
          text: "Truck #",
          dataField: "truckNum",
          filter: textFilter(),
        },
        {
          text: "Trailer #",
          dataField: "trailerNum",
          filter: textFilter(),
        },
        {
          dataField: "driver",
          text: "Driver",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "pickupCityAndState",
          text: "Pickup",
          sort: true,
          filter: textFilter(),

          formatter: (cellContent, row) => (
            <>
              {row.pickupCityAndState} <div></div> {row.pickupDateAndTime}
            </>
          ),
         
        },
        {
          dataField: "deliveryCityAndState",
          text: "Delivery",
          sort: true,
          filter: textFilter(),

          formatter: (cellContent, row) => (
            <>
              {row.deliveryCityAndState} <div></div> {row.deliveryDateAndTime}
            </>
          ),
          //This can provide coloration to the cells. Maybe for warning or emphasis on pickup date.
          //formatter: (cellContent, row) => (
           // <Badge
            //  className={"font-size-12 badge-soft-" + row.badgeclass}
           //   color={row.badgeclass}
           //   pill
           // >
           //   {row.deliveryCityAndState}
           // </Badge>
          //),
        },
        
        {
          dataField: "paymentMethod",
          isDummyField: true,
          text: "Complete Load",
          sort: true,
          style: {textAlign: 'center'},
          headerStyle: {textAlign: 'center'},
          formatter: (cellContent, row) => (

            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded"
              onClick={this.toggleViewCompleteLoadModal}
              data-toggle="modal"
              data-target="#myModalLabel"
            >
              Complete
            </Button>
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
          dataField: "view",
          isDummyField: true,
          text: "View Details",
          sort: true,
          style: {textAlign: 'center'},
          headerStyle: {textAlign: 'center'},
          formatter: (cellContent, row) => (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => this.handleUserClick(row)}
              data-toggle="modal"
              data-target="#myModalLabel"
            >
              View Details
            </Button>
          ),
        }
      ]
    }

    this.handleUserClick = this.handleUserClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.rowClassesSuccess = this.rowClassesSuccess.bind(this)
    this.rowClassesNone = this.rowClassesNone.bind(this)
    this.toggleViewCompleteLoadModal = this.toggleViewCompleteLoadModal.bind(this)
    this.toggleViewLoadDetailsModal = this.toggleViewLoadDetailsModal.bind(this)
    this.toLowerCase1 = this.toLowerCase1.bind(this)
  }

  toLowerCase1(str) {
    return str.toLowerCase();
  }

  componentDidMount() {
    const { loads, onGetLoads } = this.props
  
    try{
      if(this.props.location.state.showGreenBar == true){

        console.log("Showing green bar!")
        this.setState({ showGreenBar: true })

        //Turn off show green bar after 6 seconds
        setTimeout(() => {

          this.setState({ showGreenBar: false })

          console.log("Green bar turned off")
        }, 6000)

        //Remove history state
        window.history.replaceState({}, document.title)

      }
    } catch {
      //do nothing
    }

    onGetLoads()
    
    this.setState({ loads })
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loads } = this.props

    if (!isEmpty(loads) && size(prevProps.loads) !== size(loads)) {
      this.setState({ loads: {}, isEdit: false })
    }

  }


  rowClassesSuccess = (row, rowIndex) => {

    //Setting the first row to green
    if(row.id == this.props.location.state.rowId){
      console.log("Got the matching row!")
      console.log(row)
      return "table-success"
    }
    
  }

  rowClassesNone = (row, rowIndex) => {
    return ""
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }


  toggleViewCompleteLoadModal = () => {
    this.setState(prevState => ({
      viewCompleteLoadModal: !prevState.viewCompleteLoadModal,
    }))
  }

  toggleViewLoadDetailsModal = (loads) => {
    this.setState(prevState => ({
      viewLoadDetailsModal: !prevState.viewLoadDetailsModal,
    }))
   
  
  
  }

  format(cell, row){
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  handleUserClick = arg => {
    const load = arg
    
    this.setState({
        
      loads: {
        brokerName: load.brokerName,
        pickupCompany: load.pickupCompany,
        pickupStreetName: load.pickupStreetName,
        pickupCityAndState: load.pickupCityAndState,
        pickupPhone: load.pickupPhone,
        driverCellNum: load.driverCellNum,
        pickupZipCode: load.pickupZipCode,
        deliveryZipCode: load.deliveryZipCode,
        rateConfirmation: load.rateConfirmation,
        tripNum: load.tripNum,
        truckNum: load.truckNum,
        trailerNum: load.trailerNum,
        customer: load.customer,
        deliveryCityAndState: load.deliveryCityAndState,
        deliveryLocation: load.deliveryLocation,
        deliveryStreetName: load.deliveryStreetName,
        deliveryDateAndTime: load.deliveryDateAndTime,
        loadRate: load.loadRate,
        loadNum: load.loadNum,
        driver: load.driver,
        pickupDateAndTime: load.pickupDateAndTime,
        loadBooked: load.loadBooked
      },
      isEdit: true,
    })

    this.toggle()
  }

 
  render() {

    
    const { loads } = this.props

    const { SearchBar } = Search;
    
    //pagination customization
    const pageOptions = {
      sizePerPage: 100000,
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
        <CompleteLoadModal
          isOpen={this.state.viewCompleteLoadModal}
          toggle={this.toggleViewCompleteLoadModal}
        />
        
      <Modal
        isOpen={this.state.modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
      >

        <div className="modal-content">

          <ModalHeader toggle={this.toggle}>
            <i class="bx bx-notepad"></i>&nbsp;
            
            View Load Details 
          </ModalHeader>
          
          <ModalBody>

          <div class="col d-flex justify-content-center">
            <CardTitle className="h4 ">Customer Info</CardTitle>
          </div>
          
          
            <AvForm>
              <Row form>
                <Col className="col-12">
                  <div className="mb-3">

                    <AvField
                      readOnly
                      name="brokerName"
                      label="Broker Name"
                      type="text"
                      errorMessage="Invalid broker"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.brokerName || ""}
                    />
                  </div>


                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="carrier"
                      label="Rate"
                      type="text"
                      errorMessage="Invalid Load Rate "
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.loadRate || ""}
                    />
                  </div>
                  
                  <div class="col d-flex justify-content-center">
                    <CardTitle className="h4 ">Load Info</CardTitle>
                  </div>
                  
                 

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="owner"
                      label="Ref #"
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
                      readOnly
                      name="owner"
                      label="Driver"
                      type="text"
                      errorMessage="Invalid Driver"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.driver || ""}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="make"
                      label="Phone"
                      type="text"
                      errorMessage="Invalid Phone"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.driverCellNum || ""}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="plateNum"
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
                      readOnly
                      name="state"
                      label="Trailer #"
                      type="text"
                      errorMessage="Invalid Trailer #"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.trailerNum || ""}
                    />
                  </div>
                  
                  <div class="col d-flex justify-content-center">
                    <CardTitle className="h4 ">Pickup Info</CardTitle>
                  </div>
                  
                  

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Company"
                      type="text"
                      errorMessage="Invalid Company"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.pickupCompany || ""}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Address"
                      type="text"
                      errorMessage="Invalid Company"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.pickupStreetName + ", " + this.state.loads.pickupCityAndState + " " + this.state.loads.pickupZipCode}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Phone"
                      type="text"
                      errorMessage="Invalid Phone"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.pickupPhone || ""}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Date & Time"
                      type="text"
                      errorMessage="Invalid Date/Time"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.pickupDateAndTime || ""}
                    />
                  </div>
                  
                  <div class="col d-flex justify-content-center">
                    <CardTitle className="h4 ">Delivery Info</CardTitle>
                  </div>
                  
                 
                  
                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Address"
                      type="text"
                      errorMessage="Invalid Address"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.deliveryStreetName + ", " + this.state.loads.deliveryCityAndState + " " + this.state.loads.deliveryZipCode}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Date & Time"
                      type="text"
                      errorMessage="Invalid Date/Time"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.deliveryDateAndTime || ""}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      readOnly
                      name="vinNum"
                      label="Rate Confirmation"
                      type="text"
                      errorMessage="Invalid Date/Time"
                      validate={{
                        required: { value: true },
                      }}
                      value={this.state.loads.rateConfirmation || ""}
                    />
                  </div>

                </Col>

              </Row>
              
            </AvForm>
          
            
          </ModalBody>

          <ModalFooter>
            <Button type="button" color="secondary" onClick={this.toggle}>
              Close
            </Button>

          </ModalFooter>

        </div>
      
      </Modal>

        <Card>
          <CardBody>

            <div className="mb-4 h4 card-title">
              Delivering Today
              <a href="new-load">
                <button class="btn btn-success" style={{float:'right'}}>
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
                          filter={ filterFactory() }
                          filterPosition="top"
                          striped={true}
                          selectRow={selectRow}
                          rowClasses= {
                            this.state.showGreenBar ? (
                              this.rowClassesSuccess
                            ) : this.rowClassesNone}
                          classes={
                            "table align-middle table-nowrap table-check"
                          }
                          headerWrapperClasses={"table-light"}
                        />
                      </div>

                      {/*
                      <div className="pagination pagination-rounded justify-content-end">
                        
                        <PaginationListStandalone
                          {...paginationProps}
                        />
                      </div>
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

LatestTransaction.propTypes = {
  loads: PropTypes.array,
}


const mapStateToProps = state => ({
  loads: state.ecommerce.loads,
})

const mapDispatchToProps = dispatch => ({
  onGetLoads: () => dispatch(getLoads()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LatestTransaction))