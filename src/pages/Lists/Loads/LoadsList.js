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
} from "store/actions"

import EcommerceOrdersModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersModal"


class LoadsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewmodal: false,
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
          text: "Trip #",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.tripNum}
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
          text: "Booked",
          sort: true,
          formatter: () => (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={this.toggleViewModal}
            >
              Booked
            </Button>
          ),
        },
        {
          dataField: "loadActions",
          isDummyField: true,
          text: "Actions",
          sort: true,
          editable: false,
          formatter: (cellContent, loads) => (
            <div className="d-flex gap-3">
              <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => this.handleUserClick(loads)}></i></Link>
              <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => this.handleDeleteUser(loads)}></i></Link>
            </div>
          ),
        }
      ]
    }
    this.toggle = this.toggle.bind(this)
    this.toLowerCase1 = this.toLowerCase1.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
  }

  toLowerCase1(str) {
    return str.toLowerCase();
  }

  componentDidMount() {

    const { loads, onGetLoads } = this.props
    
   
    onGetLoads()
    

    this.setState({ loads })

    console.log("Set state loads")
    console.log(loads)
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {

    const { loads } = this.props
   
    if (!isEmpty(loads) && size(prevProps.loads) !== size(loads)) {
      this.setState({ loads: {}, isEdit: false })
     
    }
  
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
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
        loadRate: load.loadRate
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
      sizePerPage: 1000,
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
              Current Loads
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
                                      label="Trip #"
                                      type="text"
                                      errorMessage="Invalid age"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      value={this.state.loads.tripNum || ""}
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

LoadsList.propTypes = {
  loads: PropTypes.array,
  onGetLoads: PropTypes.func,
}

function mapStateToProps(state) {
  const props = { loads: state.ecommerce.loads };
  return props;
}

{/*
const mapStateToProps = state => ({
  loads: state.ecommerce.loads,
})
*/}


const mapDispatchToProps = dispatch => ({
  onGetLoads: () => dispatch(getLoads()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoadsList))