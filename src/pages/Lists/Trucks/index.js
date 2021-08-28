import React, {Component} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import MetaTags from 'react-meta-tags';
import { withRouter, Link } from "react-router-dom"
import { 
  Card, 
  CardBody, 
  Col, 
  Container, 
  Row, 
  Modal, 
  Button, 
  ModalHeader, 
  ModalBody, 
} from "reactstrap"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from 'react-bootstrap/Popover';

import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import images from "assets/images"

import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getDrivers,
  getShippers,
  getTrucks,
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
            filter: textFilter(),
            
        },
        {
            text: "Carrier",
            dataField: "carrier",
            filter: textFilter(),
        },
        {
            text: "Truck #",
            dataField: "truckNum",
            filter: textFilter(),
        },
        {
          text: "Owner",
          dataField: "owner",
          filter: textFilter(),
          formatter: (cellContent, truck) => (
            <>
              {truck.owner}
            </>
          ),
        },
        {
          text: "Make",  
          dataField: "make",
          headerTitle: () => "This is the full VIN here!",
          filter: textFilter(),
        },
        {
            text: "Plate #",  
            dataField: "plateNum",
            filter: textFilter(),
        },
        {
            text: "State",  
            dataField: "state",
            filter: textFilter(),
        }, 
        {
            text: "VIN #",  
            dataField: "vinNum",
            filter: textFilter(),
        },  
        {
            text: "Year",  
            dataField: "year",
            filter: textFilter(),
        }, 
        {
            text: "Location",  
            dataField: "location",
            filter: textFilter(),
        }, 
        {
            text: "Actions",
            dataField: "actions",
            isDummyField: true,
            editable: false,
            formatter: (cellContent, truck) => ( 
              <>
                <div className="d-flex gap-3">
                  <OverlayTrigger
                    trigger="click"
                    key={truck.id}
                    placement="left"
                    overlay={
                      <Popover id={"popover" + truck.id}>
                        <Popover.Header as="h3">
                          <span style={{ cursor: "pointer"}} onClick={() => this.handleUserClick(truck)}>
                            <i className="bx bx-pencil text-primary font-size-18"></i>
                          </span>
                          &nbsp;
                          {truck.notes == "" ? 'No notes' : 'Important note' }
                          </Popover.Header>
                        <Popover.Body>
                          {truck.notes == "" ? 'No notes yet.' : <strong>Holy guacamole!</strong> }
                          <br></br>
                          <br></br>
                          {truck.notes}
                          {/*
                          <br></br>
                          <br></br>
                          <Button id={"SaveBtn" + truck.id} style={{ float: "right"}} className="btn-sm btn-rounded" color="success">Save</Button>
                          */}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    {/* Conditional rendering. If has truck notes, display yellow notepad.*/}
                    <Link className={truck.notes == "" ? 'text-info disabledCursor' : 'text-warning'} to="#"><i style={{ marginTop: "20%" }} className="bx bx-notepad font-size-18"></i></Link>
                  </OverlayTrigger>
                  {/*<Link className="text-warning" to="#"><i className="dripicons-warning font-size-18" id="edittooltip" onClick={() => this.handleUserClick(truck)}></i></Link>*/}
                  <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => this.handleUserClick(truck)}></i></Link>
                  <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => this.handleDeleteUser(truck)}></i></Link>
                </div>
              </>
              
            ),
        }
      ]
    }

    this.handleUserClick = this.handleUserClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleValidUserSubmit = this.handleValidUserSubmit.bind(this)
    this.handleUserClicks = this.handleUserClicks.bind(this)
  }


  
  btnClicked(id){
    console.log("Clicked button with id " + id)
  }

  
  componentDidMount() {

    const { trucks, onGetTrucks } = this.props


    if (trucks && !trucks.length) {
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
  
    if (!isEmpty(trucks) && (size(prevProps.trucks) !== size(trucks)) ) {
      this.setState({ trucks: {}, isEdit: false})
    } 


  }

  /* Insert,Update Delete data */

  handleDeleteUser = (truck) => {
    const { onDeleteUser } = this.props
    onDeleteUser(truck)
  }

  handleUserClick = arg => {
    const truck = arg

    this.setState({
        
      trucks: {
        id: truck.id,
        age: truck.age,
        carrier: truck.carrier,
        truckNum: truck.truckNum,
        owner: truck.owner,
        make: truck.make,
        plateNum: truck.plateNum,
        state: truck.state,
        vinNum: truck.vinNum,
        year: truck.year,
        location: truck.location,
        notes: truck.notes
      },
      isEdit: true,
    })

    this.toggle()
  }

  /**
   * Handling submit truck on truck form
   */
  handleValidUserSubmit = (e, values) => {
    //const { onAddNewUser, onUpdateUser } = this.props
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

      // update truck
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
      // save new truck
      //addNewTruck(newUser)
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
                                          filter={ filterFactory() }
                                          filterPosition="top"
                                          striped={false}
                                          responsive
                                        />

                                       {/*
                                        This is where the tooltips for trucks are generated
                                        We link them to the notepad link under actions
                                      */}


                                        <Modal
                                          isOpen={this.state.modal}
                                          className = 'modal-dialog modal-dialog-scrollable'
                                          //className={this.props.className}
                                        >
                                          <ModalHeader toggle={this.toggle} tag="h4">
                                            {!!isEdit ? "Edit truck" : "Save Truck"}
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
                                                      name="notes"
                                                      label="Notes"
                                                      type="text"
                                                      errorMessage="Invalid Notes"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      value={this.state.trucks.notes || ""}
                                                    />
                                                  </div>
                                                  
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
                                                      value={this.state.trucks.carrier || ""}
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
                                                      value={this.state.trucks.truckNum || ""}
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
                                                      value={this.state.trucks.owner || ""}
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
                                                      value={this.state.trucks.make || ""}
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
                                                      value={this.state.trucks.plateNum || ""}
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
                                                      value={this.state.trucks.state || ""}
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
                                                      value={this.state.trucks.vinNum || ""}
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
                                                      value={this.state.trucks.year || ""}
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
                                                      value={this.state.trucks.location || ""}
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
                                                      Save Truck
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

Trucks.propTypes = {
  trucks: PropTypes.array,
  onGetTrucks: PropTypes.func,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Trucks))