import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import MetaTags from 'react-meta-tags';
import { withRouter, Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap"
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import images from "assets/images"

import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getDrivers,
  getShippers,
  getTruckingCustomers,
  addNewUser,
  updateUser,
  deleteUser
} from "store/contacts/actions"

import { isEmpty, size, map } from "lodash"
import { roundWithPrecision } from "chartist";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      modal: false,
      customerListColumns: [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
          formatter: (cellContent, customer) => (
            <>
              {customer.id}
            </>
          ),
        },
        {
          text: "Name",
          dataField: "name",
        },
        {
          text: "Contact Name",
          dataField: "contactName",
        },
        {
          text: "MC #",
          dataField: "mcNum",
        },
        {
            text: "City, State",
            dataField: "city",
        },
        {
          text: "Local Phone",
          dataField: "localPhone",
          formatter: (cellContent, customer) => (
            <>
              {customer.localPhone}
            </>
          ),
        },
        {
          text: "Dispatch Fax",  
          dataField: "dispatchFax",
        },
        {
            text: "Credit Limit",  
            dataField: "creditLimit",
            formatter: (cellContent, customer) => (
                <>
                  <h6 class="mb-0 text-success">{customer.creditLimit}</h6>  
                </>
            ),
        },
        {
            text: "Actions",
            dataField: "actions",
            isDummyField: true,
            editable: false,
            formatter: (cellContent, shipper) => (
              <div className="d-flex gap-3">
                <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => this.handleUserClick(shipper)}></i></Link>
                <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => this.handleDeleteUser(shipper)}></i></Link>
              </div>
            ),
        }
      ]
    }
    this.handleUserClick = this.handleUserClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleValidUserSubmit = this.handleValidUserSubmit.bind(this)
    this.handleUserClicks = this.handleUserClicks.bind(this)
  }

  componentDidMount() {

    const { customers, onGetCustomers } = this.props
    if (customers && !customers.length) {
      console.log('getting customers!!!!!!')
      onGetCustomers(); 
    }

    this.setState({ customers })

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  handleUserClicks = arg => {
    this.setState({ customers: '', isEdit: false })
    this.toggle()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { customers } = this.props
    if (!isEmpty(customers) && size(prevProps.customers) !== size(customers)) {
      this.setState({ customers: {}, isEdit: false })
    }
  }

  /* Insert,Update Delete data */

  handleDeleteUser = (shipper) => {
    const { onDeleteUser } = this.props
    onDeleteUser(shipper)
  }

  handleUserClick = arg => {
    const shipper = arg

    this.setState({
        
      customer: {
        id: shipper.id,
        name: shipper.name,
        designation: shipper.designation,
        email: shipper.email,
        tags: shipper.tags,
        projects: shipper.projects
      },
      isEdit: true,
    })

    this.toggle()
  }

  /**
   * Handling submit shipper on shipper form
   */
  handleValidUserSubmit = (e, values) => {
    const { onAddNewUser, onUpdateUser } = this.props
    const { isEdit, customers, selectedUser } = this.state

    if (isEdit) {
      const updateUser = {
        id: values.id,
        name: values.name,
        designation: values.designation,
        tags: values.tags,
        email: values.email,
        projects: values.projects
      }

      // update shipper
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
      // save new shipper
      onAddNewUser(newUser)
    }
    this.setState({ selectedUser: null })
    this.toggle()
  }

  /* Insert,Update Delete data */

  render() {
    // const { customers } = this.state
    const { SearchBar } = Search;

    const { customers } = this.props

    const { isEdit } = this.state

    const pageOptions = {
      sizePerPage: 10,
      totalSize: customers.length, // replace later with size(customers),
      custom: true,
    }

    const defaultSorted = [{
      dataField: 'id', // if dataField is not match to any column you defined, it will be ignored.
      order: 'desc' // desc or asc
    }];

    const selectRow = {
      mode: 'checkbox'
    };

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>customers List | Stellar</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="customers" breadcrumbItem="customers List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>

                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField='id'
                      columns={this.state.customerListColumns}
                      data={customers}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <ToolkitProvider
                            keyField='id'
                            columns={this.state.customerListColumns}
                            data={customers}
                            search
                          >
                            {
                              toolkitprops => (
                                <React.Fragment>
                                  <Row className="mb-2">
                                    <Col sm="4">
                                      <div className="search-box ms-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                          <SearchBar {...toolkitprops.searchProps} />
                                          <i className="bx bx-search-alt search-icon" />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col sm="8">
                                      <div className="text-sm-end">
                                        <Button
                                          color="primary"
                                          className="font-16 btn-block btn btn-primary"
                                          onClick={this.handleUserClicks}
                                        >
                                          <i className="mdi mdi-plus-circle-outline me-1" />
                                          Add Customer
                                        </Button>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xl="12">
                                      <div className="table-responsive">
                                        <BootstrapTable
                                          {...toolkitprops.baseProps}
                                          {...paginationTableProps}
                                          selectRow={selectRow}
                                          defaultSorted={defaultSorted}
                                          classes={
                                            "table align-middle table-nowrap table-hover "
                                          }
                                          bordered={false}
                                          striped={false}
                                          responsive
                                        />

                                        <Modal
                                          isOpen={this.state.modal}
                                          className={this.props.className}
                                        >
                                          <ModalHeader toggle={this.toggle} tag="h4">
                                            {!!isEdit ? "Edit customer" : "Add customer"}
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
                                                      name="name"
                                                      label="Name"
                                                      type="text"
                                                      errorMessage="Invalid name"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.name || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">

                                                    <AvField
                                                      name="contactName"
                                                      label="Contact Name"
                                                      type="text"
                                                      errorMessage="Invalid Contact Name"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.designation || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="email"
                                                      label="MC #"
                                                      type="email"
                                                      errorMessage="Invalid MC #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.email || ""}
                                                    />
                                                  </div>
                                                  
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="cityState"
                                                      label="City, State"
                                                      type="text"
                                                      errorMessage="Invalid City, State"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="localPhone"
                                                      label="Local Phone"
                                                      type="text"
                                                      errorMessage="Invalid Local Phone"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="dispatchFax"
                                                      label="Dispatch Fax"
                                                      type="text"
                                                      errorMessage="Invalid Dispatch Fax"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="creditLimit"
                                                      label="Credit Limit"
                                                      type="text"
                                                      errorMessage="Invalid Credit Limit"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.customers.projects || ""}
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
                                                      Save
                                                    </button>
                                                  </div>
                                                </Col>
                                              </Row>
                                            </AvForm>
                                          </ModalBody>
                                        </Modal>
                                      </div>
                                    </Col>
                                  </Row>


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
              </Col>
            </Row>

            

          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Customers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func
}

function mapStateToProps(state) {
    const props = { customers: state.contacts.truckingCustomers };
    return props;
  }

{/*
const mapStateToProps = state => ({
  shippers: state.contacts.shippers,
})
*/}

const mapDispatchToProps = dispatch => ({
  onGetCustomers: () => dispatch(getTruckingCustomers()),
  onAddNewUser: driver => dispatch(addNewUser(driver)),
  onUpdateUser: driver => dispatch(updateUser(driver)),
  onDeleteUser: driver => dispatch(deleteUser(driver)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Customers))