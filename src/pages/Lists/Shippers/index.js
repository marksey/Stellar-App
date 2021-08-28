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

import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getShippers,
} from "store/contacts/actions"

import { isEmpty, size, map } from "lodash"
import { roundWithPrecision } from "chartist";

class Shippers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippers: [],
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
          dataField: "name",
          text: "Name",
          filter: textFilter(),
        },
        {
          text: "Contact Name",
          dataField: "contactName",
          filter: textFilter(),
        },
        {
          text: "City, State",
          dataField: "cityStateZip",
          filter: textFilter(),
        },
        {
          text: "Phone",
          dataField: "phone",
          filter: textFilter(),
          formatter: (cellContent, shipper) => (
            <>
              {shipper.phone}
            </>
          ),
        },
        {
          text: "Fax",  
          dataField: "fax",
          filter: textFilter(),
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

    const { shippers, onGetShippers } = this.props
    if (shippers && !shippers.length) {
      console.log('getting shippers!!!!!!')
      onGetShippers(); 
    }

    this.setState({ shippers })

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  handleUserClicks = arg => {
    this.setState({ shippers: '', isEdit: false })
    this.toggle()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { shippers } = this.props
    if (!isEmpty(shippers) && size(prevProps.shippers) !== size(shippers)) {
      this.setState({ shippers: {}, isEdit: false })
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
        
      shippers: {
        id: shipper.id,
        name: shipper.name,
        contactName: shipper.contactName,
        cityStateZip: shipper.cityStateZip,
        phone: shipper.phone,
        fax: shipper.fax
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
    const { isEdit, shippers, selectedUser } = this.state

    if (isEdit) {
      const updateUser = {
        id: shippers.id,
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
    // const { shippers } = this.state
    const { SearchBar } = Search;

    const { shippers } = this.props

    const { isEdit } = this.state

    const pageOptions = {
      sizePerPage: 10,
      totalSize: shippers.length, // replace later with size(shippers),
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
            <title>Shippers List | Stellar</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Shippers" breadcrumbItem="Shippers List" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>

                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField='id'
                      columns={this.state.shipperListColumns}
                      data={shippers}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <ToolkitProvider
                            keyField='id'
                            columns={this.state.shipperListColumns}
                            data={shippers}
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
                                          Add Shipper
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
                                            "table align-middle table-nowrap table-hover table-sm"
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
                                            {!!isEdit ? "Edit shipper" : "Add shipper"}
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
                                                      value={this.state.shippers.name || ""}
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
                                                      value={this.state.shippers.contactName || ""}
                                                    />
                                                  </div>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="email"
                                                      label="City, State ZIP"
                                                      type="email"
                                                      errorMessage="Invalid City, State, ZIP"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.shippers.cityStateZip || ""}
                                                    />
                                                  </div>
                                                  
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="phone"
                                                      label="Phone"
                                                      type="text"
                                                      errorMessage="Invalid Phone"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.shippers.phone || ""}
                                                    />
                                                  </div>

                                                  <div className="mb-3">
                                                    <AvField
                                                      name="fax"
                                                      label="Fax"
                                                      type="text"
                                                      errorMessage="Invalid Fax"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.shippers.fax || ""}
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
                                                      <i class="bx bx-check font-size-16 align-middle me-2"></i>
                                                      Add Shipper
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
              </Col>
            </Row>

            

          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Shippers.propTypes = {
  shippers: PropTypes.array,
  onGetShippers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func
}

function mapStateToProps(state) {
    const props = { shippers: state.contacts.shippers };
    return props;
  }

{/*
const mapStateToProps = state => ({
  shippers: state.contacts.shippers,
})
*/}

const mapDispatchToProps = dispatch => ({
  onGetShippers: () => dispatch(getShippers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Shippers))