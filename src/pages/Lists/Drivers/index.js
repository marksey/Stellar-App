import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import MetaTags from 'react-meta-tags';
import { withRouter, Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap"
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import images from "assets/images"

import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getDrivers,
  addNewUser,
  updateUser,
  deleteUser
} from "store/contacts/actions"

import { isEmpty, size, map } from "lodash"
import { roundWithPrecision } from "chartist";

class DriversList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      modal: false,
      driverListColumns: [
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
          dataField: "img",
          text: "",
          formatter: (cellContent, driver) => (
            <>
              {!driver.img ? (
                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle">
                    {driver.name.charAt(0)}
                  </span>
                </div>
              ) : (
                <div>
                  <img
                    className="rounded-circle avatar-xs"
                    src={images[driver.img]}
                    alt=""
                  />
                </div>
              )}
            </>
          ),
        },
        {
          text: "Full Name",
          dataField: "name",
          sort: true,
          formatter: (cellContent, driver) => (
            <>
              <h5 className="font-size-14 mb-1">
                <Link to="#" className="text-dark">
                  {driver.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">{driver.designation}</p>
            </>
          ),
        },
        {
          text: "Truck #",
          dataField: "truckNum",
        },
        {
          text: "Pull Notice",
          dataField: "pullNotice",
          formatter: (cellContent, driver) => (
            <>
              {driver.pullNotice}
            </>
          ),
        },
        {
          text: "Cell #",  
          dataField: "cellNum",
        },
        {
          text: "Trailer #",
          dataField: "trailerNum",
          editable: false,          
        },
        {
            text: "Actions",
            dataField: "actions",
            isDummyField: true,
            editable: false,
            formatter: (cellContent, driver) => (
              <div className="d-flex gap-3">
                <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => this.handleUserClick(driver)}></i></Link>
                <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => this.handleDeleteUser(driver)}></i></Link>
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

    const { drivers, onGetDrivers } = this.props
    if (drivers && !drivers.length) {
      onGetDrivers(); 
    }

    this.setState({ drivers })

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  handleUserClicks = arg => {
    this.setState({ drivers: '', isEdit: false })
    this.toggle()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { drivers } = this.props
    if (!isEmpty(drivers) && size(prevProps.drivers) !== size(drivers)) {
      this.setState({ drivers: {}, isEdit: false })
    }
  }

  /* Insert,Update Delete data */

  handleDeleteUser = (driver) => {
    const { onDeleteUser } = this.props
    onDeleteUser(driver)
  }

  handleUserClick = arg => {
    const driver = arg

    this.setState({
        
      drivers: {
        id: driver.id,
        name: driver.name,
        designation: driver.designation,
        email: driver.email,
        tags: driver.tags,
        projects: driver.projects
      },
      isEdit: true,
    })

    this.toggle()
  }

  /**
   * Handling submit driver on driver form
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

  /* Insert,Update Delete data */

  render() {
    // const { drivers } = this.state
    const { SearchBar } = Search;

    const { drivers } = this.props

    const { isEdit } = this.state

    const pageOptions = {
      sizePerPage: 7,
      totalSize: drivers.length, // replace later with size(drivers),
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
            <title>Drivers List | Stellar</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Drivers" breadcrumbItem="Drivers List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>

                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField='id'
                      columns={this.state.driverListColumns}
                      data={drivers}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <ToolkitProvider
                            keyField='id'
                            columns={this.state.driverListColumns}
                            data={drivers}
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
                                          Add Driver
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
                                            "table align-middle table-nowrap table-hover"
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
                                            {!!isEdit ? "Edit driver" : "Add driver"}
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
                                                      value={this.state.drivers.name || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">

                                                    <AvField
                                                      name="designation"
                                                      label="Designation"
                                                      type="text"
                                                      errorMessage="Invalid Designation"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.designation || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="email"
                                                      label="Email"
                                                      type="email"
                                                      errorMessage="Invalid Email"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.email || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField type="select" name="tags" className="form-select" label="Option" helpMessage="MULTIPLE!" multiple={true} required
                                                      value={this.state.drivers.tags || ""}

                                                    >
                                                      <option>Photoshop</option>
                                                      <option>illustrator</option>
                                                      <option>Html</option>
                                                      <option>Php</option>
                                                      <option>Java</option>
                                                      <option>Python</option>
                                                      <option>UI/UX Designer</option>
                                                      <option>Ruby</option>
                                                      <option>Css</option>
                                                    </AvField>
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="projects"
                                                      label="Projects"
                                                      type="text"
                                                      errorMessage="Invalid Projects"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.projects || ""}
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
                                    <Col className="pagination pagination-rounded justify-content-end mb-2">
                                      <PaginationListStandalone
                                        {...paginationProps}
                                      />
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

DriversList.propTypes = {
  drivers: PropTypes.array,
  onGetDrivers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func
}

function mapStateToProps(state) {
    const props = { drivers: state.contacts.drivers };
    return props;
  }

{/*
const mapStateToProps = state => ({
  drivers: state.contacts.drivers,
})
*/}

const mapDispatchToProps = dispatch => ({
  onGetDrivers: () => dispatch(getDrivers()),
  onAddNewUser: driver => dispatch(addNewUser(driver)),
  onUpdateUser: driver => dispatch(updateUser(driver)),
  onDeleteUser: driver => dispatch(deleteUser(driver)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DriversList))