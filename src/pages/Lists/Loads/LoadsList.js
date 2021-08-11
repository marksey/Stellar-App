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
import { Link } from "react-router-dom"
import * as moment from 'moment';

import { Button, Card, CardBody, Row, Col, Badge, Modal } from "reactstrap"

//Import data
import { discountData, productsData } from "common/data"

import {
  getCartData,
  getCustomers,
  getLoads,
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder
} from "store/actions"

import EcommerceOrdersModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
import uiModal from "../../Ui/UiModal"


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
          dataField: "tripNum",
          text: "Trip #",
          sort: true,
          formatter: (cellContent, row) => (
            <Link to="#" className="text-body fw-bold">
              {row.tripNum}
            </Link>
          ),
        },
        {
          dataField: "truckNum",
          text: "Truck #",
          sort: true,
        },
        {
          dataField: "trailerNum",
          text: "Trailer #",
          sort: true,         
        },
        {
          dataField: "customer",
          text: "Customer",
          sort: true,

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
          formatter: (cellContent, row) => (
            <>
              {row.pickupLocation} <div></div> {row.pickupDateandTime}
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
          formatter: (cellContent, row) => (
            <>
              {row.deliveryLocation} <div></div> {row.deliveryDateandTime}
            </>
          ),
        },
        {
          dataField: "loadRate",
          isDummyField: true,
          text: "Rate",
          sort: true,
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
          formatter: () => (
            <Button
              type="button"
              color="secondary"
              className="btn-sm btn-rounded"
              onClick={this.toggleViewModal}
            >
              Actions
            </Button>
          ),
        }
      ]
    }
    this.toggle = this.toggle.bind(this)
    this.toLowerCase1 = this.toLowerCase1.bind(this)
  }

  toLowerCase1(str) {
    return str.toLowerCase();
  }

  componentDidMount() {

    const { loads, onGetLoads } = this.props
    
    if (loads && !loads.length) {
      onGetLoads()
    }

    this.setState({ loads })
    
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

  render() {
    const { loads } = this.props


    //pagination customization
    const pageOptions = {
      sizePerPage: 7,
      totalSize: loads.length, // replace later with size(Order),
      custom: true,
    }

    const defaultSorted = [{
      dataField: 'orderId',
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
                  Add New Load
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
                          selectRow={selectRow}
                          classes={
                            "table align-middle table-nowrap table-check"
                          }
                          headerWrapperClasses={"table-light"}
                        />
                      </div>

                    
                  
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
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func
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
  onAddNewOrder: order => dispatch(addNewOrder(order)),
  onUpdateOrder: order => dispatch(updateOrder(order)),
  onDeleteOrder: order => dispatch(deleteOrder(order)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoadsList))