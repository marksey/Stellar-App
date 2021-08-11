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
  getTrucks,
  addNewUser,
  updateUser,
  deleteUser
} from "store/contacts/actions"

import { isEmpty, size, map } from "lodash"
import { roundWithPrecision } from "chartist";

class Trucks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trucks: [],
      modal: false,
      shipperListColumns: [
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
            text: "Age",
            dataField: "age",
        },
        {
            text: "Carrier",
            dataField: "carrier",
        },
        {
            text: "Truck #",
            dataField: "truckNum",
        },
        {
          text: "Owner",
          dataField: "owner",
          formatter: (cellContent, truck) => (
            <>
              {truck.owner}
            </>
          ),
        },
        {
          text: "Make",  
          dataField: "make",
        },
        {
            text: "Plate #",  
            dataField: "plateNum",
        },
        {
            text: "State",  
            dataField: "state",
        }, 
        {
            text: "VIN #",  
            dataField: "vinNum",
        },  
        {
            text: "Year",  
            dataField: "year",
        }, 
        {
            text: "Location",  
            dataField: "location",
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

    const { trucks, onGetTrucks } = this.props
    if (trucks && !trucks.length) {
      console.log('getting trucks!!!!!!')
      onGetTrucks(); 
    }

    this.setState({ trucks })

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  handleUserClicks = arg => {
    this.setState({ trucks: '', isEdit: false })
    this.toggle()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { trucks } = this.props
    if (!isEmpty(trucks) && size(prevProps.trucks) !== size(trucks)) {
      this.setState({ trucks: {}, isEdit: false })
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
        
      trucks: {
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
    const { isEdit, trucks, selectedUser } = this.state

    if (isEdit) {
      const updateUser = {
        id: trucks.id,
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
    // const { trucks } = this.state
    const { SearchBar } = Search;

    const { trucks } = this.props

    const { isEdit } = this.state

    const pageOptions = {
      sizePerPage: 10,
      totalSize: trucks.length, // replace later with size(trucks),
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
            <title>Trucks List | Stellar</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Trucks" breadcrumbItem="Trucks List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>

                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField='id'
                      columns={this.state.shipperListColumns}
                      data={trucks}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <ToolkitProvider
                            keyField='id'
                            columns={this.state.shipperListColumns}
                            data={trucks}
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
                                          Add Truck
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
                                          className = 'modal-dialog modal-dialog-scrollable'
                                          //className={this.props.className}
                                        >
                                          <ModalHeader toggle={this.toggle} tag="h4">
                                            {!!isEdit ? "Edit truck" : "Add Truck"}
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
                                                      name="age"
                                                      label="Age"
                                                      type="text"
                                                      errorMessage="Invalid age"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.age || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">

                                                    <AvField
                                                      name="carrier"
                                                      label="Carrier"
                                                      type="text"
                                                      errorMessage="Invalid Carrier Name"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.designation || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="truckNum"
                                                      label="Truck #"
                                                      type="text"
                                                      errorMessage="Invalid Truck #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.email || ""}
                                                    />
                                                  </div>
                                                  
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="owner"
                                                      label="Owner"
                                                      type="text"
                                                      errorMessage="Invalid Owner"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="make"
                                                      label="Make"
                                                      type="text"
                                                      errorMessage="Invalid Make"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="plateNum"
                                                      label="Plate #"
                                                      type="text"
                                                      errorMessage="Invalid Plate #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="state"
                                                      label="State"
                                                      type="text"
                                                      errorMessage="Invalid State"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="vinNum"
                                                      label="Vin #"
                                                      type="text"
                                                      errorMessage="Invalid Vin #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="year"
                                                      label="Year"
                                                      type="text"
                                                      errorMessage="Invalid Year"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="location"
                                                      label="Location"
                                                      type="text"
                                                      errorMessage="Invalid Location"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.projects || ""}
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
                                                      Add Truck
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

Trucks.propTypes = {
  trucks: PropTypes.array,
  onGetTrucks: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func
}

function mapStateToProps(state) {
    const props = { trucks: state.contacts.trucks };
    return props;
  }

{/*
const mapStateToProps = state => ({
  shippers: state.contacts.shippers,
})
*/}

const mapDispatchToProps = dispatch => ({
  onGetTrucks: () => dispatch(getTrucks()),
  onAddNewUser: driver => dispatch(addNewUser(driver)),
  onUpdateUser: driver => dispatch(updateUser(driver)),
  onDeleteUser: driver => dispatch(deleteUser(driver)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Trucks))