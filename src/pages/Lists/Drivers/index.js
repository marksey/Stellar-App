import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import MetaTags from 'react-meta-tags';
import { withRouter, Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap"
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from "react-bootstrap-table-next"

import images from "assets/images"

import Dropzone from "react-dropzone"

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
      selectedFiles: [],
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
          filter: textFilter(),
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
          filter: textFilter(),
        },
        {
          text: "Pull Notice",
          dataField: "pullNotice",
          filter: textFilter(),
          formatter: (cellContent, driver) => (
            <>
              {driver.pullNotice}
            </>
          ),
        },
        {
          text: "Cell #",  
          dataField: "cellNum",
          filter: textFilter(),
        },
        {
          text: "Trailer #",
          dataField: "trailerNum",
          filter: textFilter(),
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
    this.handleAcceptedFiles.bind(this)
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
        truckNum: driver.truckNum,
        cellNum: driver.cellNum,
        trailerNum: driver.trailerNum,
        pullNotice: driver.pullNotice        
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
                                          filter={ filterFactory() }
                                          filterPosition="top"
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
                                                      name="fullName"
                                                      label="Full Name"
                                                      type="text"
                                                      errorMessage="Invalid name"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.name || ""}
                                                    />
                                                  </div>
                                                 
                                                  <div className="mb-3">

                                                    
                                                    <Dropzone
                                                      onDrop={acceptedFiles =>
                                                        this.handleAcceptedFiles(acceptedFiles)
                                                      }
                                                    >
                                                      {({ getRootProps, getInputProps }) => (
                                                        <div className="dropzone" style={{minHeight: '100px', maxHeight: '100px'}}>
                                                          <div
                                                            className="dz-message needsclick"
                                                            {...getRootProps()}
                                                            style={{minHeight: '100px', maxHeight: '100px'}}
                                                            //min and max height makes dropzone smaller
                                                          >
                                                            <input {...getInputProps()} />
                                                            
                                                              {/*/Margin top makes the text fit in the DropZone. May need to code better*/}
                                                              <div className="mb-3" style={{marginTop: '-8%'}}>
                                                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                                <h5>Click or drop here to add file attachments.</h5>
                                                              </div>
                                                            
                                                          </div>
                                                        </div>
                                                      )}
                                                    </Dropzone>
                                                  </div>

                                                  <div
                                                    className="dropzone-previews mt-3"
                                                    id="file-previews"
                                                  >
                                                    {this.state.selectedFiles.map((f, i) => {
                                                      return (
                                                        <Card
                                                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                          key={i + "-file"}
                                                        >
                                                          <div className="p-2">
                                                            <Row className="align-items-center">
                                                              <Col className="col-auto">
                                                                <img
                                                                  data-dz-thumbnail=""
                                                                  height="80"
                                                                  className="avatar-sm rounded bg-light"
                                                                  alt={f.name}
                                                                  src={f.preview}
                                                                />
                                                              </Col>
                                                              <Col>
                                                                <Link
                                                                  to="#"
                                                                  className="text-muted font-weight-bold"
                                                                >
                                                                  {f.name}
                                                                </Link>
                                                                <p className="mb-0">
                                                                  <strong>{f.formattedSize}</strong>
                                                                </p>
                                                              </Col>
                                                            </Row>
                                                          </div>
                                                        </Card>
                                                      )
                                                    })}
                                                  </div>

                                                  <div className="mb-3">

                                                    <AvField
                                                      name="designation"
                                                      label="Truck #"
                                                      type="text"
                                                      errorMessage="Invalid Truck #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.truckNum || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="pullNotice"
                                                      label="Pull Notice"
                                                      type="email"
                                                      errorMessage="Invalid Pull"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.pullNotice || ""}
                                                    />
                                                  </div>
                                                  
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="cellNum"
                                                      label="Cell #"
                                                      type="text"
                                                      errorMessage="Invalid Cell #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.cellNum || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="truckNum"
                                                      label="Trailer #"
                                                      type="text"
                                                      errorMessage="Invalid Trailer #"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.drivers.trailerNum || ""}
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