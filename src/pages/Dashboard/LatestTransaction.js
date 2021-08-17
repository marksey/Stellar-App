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

import { Button, Card, CardBody, Badge, Modal } from "reactstrap"

import {
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder
} from "store/actions"

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
import uiModal from "../Ui/UiModal"

class LatestTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewmodal: false,
      modal: false,
      orders: [],
      EcommerceOrderColumns: [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
          formatter: (cellContent, user) => (
            <>
              {order.id}
            </>
          ),
        },
        {
          dataField: "orderId",
          text: "Ref Number",
          sort: true,
          filter: textFilter(),
          formatter: (cellContent, row) => (
            <Link to="#" className="text-body fw-bold">
              {row.orderId}
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
          dataField: "total",
          text: "Pickup",
          sort: true,

          formatter: (cellContent, row) => (
            <>
              {row.total} <div></div> {row.pickupTime}
            </>
          ),
         
        },
        {
          dataField: "paymentStatus",
          text: "Delivery",
          sort: true,

          formatter: (cellContent, row) => (
            <>
              {row.paymentStatus} <div></div> {row.deliveryTime}
            </>
          ),
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
              onClick={this.toggleViewModal}
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
          formatter: () => (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={this.toggleViewModal}
            >
              View Details
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
    const { orders, onGetOrders } = this.props
    if (orders && !orders.length) {
      onGetOrders()
    }
    this.setState({ orders })
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { orders } = this.props
    if (!isEmpty(orders) && size(prevProps.orders) !== size(orders)) {
      this.setState({ orders: {}, isEdit: false })
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
    const { orders } = this.props

    const { SearchBar } = Search;

    //pagination customization
    const pageOptions = {
      sizePerPage: 7,
      totalSize: orders.length, // replace later with size(Order),
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
              data={orders}
            >
              {({ paginationProps, paginationTableProps }) => (

                <ToolkitProvider
                  keyField="id"
                  data={orders}
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
                          classes={
                            "table align-middle table-nowrap table-check"
                          }
                          headerWrapperClasses={"table-light"}
                        />
                      </div>
                      <div className="pagination pagination-rounded justify-content-end">
                        <PaginationListStandalone
                          {...paginationProps}
                        />
                      </div>
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
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func
}

const mapStateToProps = state => ({
  orders: state.ecommerce.orders,
})

const mapDispatchToProps = dispatch => ({
  onGetOrders: () => dispatch(getOrders()),
  onAddNewOrder: order => dispatch(addNewOrder(order)),
  onUpdateOrder: order => dispatch(updateOrder(order)),
  onDeleteOrder: order => dispatch(deleteOrder(order)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LatestTransaction))