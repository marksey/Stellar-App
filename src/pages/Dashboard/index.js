import React, { Component } from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input
} from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

//import action
import { getChartsData } from "../../store/actions"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTransaction from "./LatestTransaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import classNames from "classnames";

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reports: [
        { title: "Trucks Schedule", 
          iconClass: "bx bxs-truck", 
          description: "19" ,
          url: "/trucks",
        },
        {
          title: "In Transit",
          iconClass: "bx bx-transfer",
          description: "77",
          url: "/loads",
        },
        {
          title: "Completed",
          iconClass: "bx bxs-calendar-heart",
          description: "365",
          url: "/loads",
        },
      ],
      email: [
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: true },
      ],
      modal: false,
      subscribemodal: false,
      chartSeries: [],
      periodType: "yearly"
    }

    this.togglemodal.bind(this)
    this.togglesubscribemodal.bind(this)
  }

  
  handleClick(){
    console.log("Clicked!!!!");
  }

  componentDidMount() {
    const { onGetChartsData } = this.props
    setTimeout(() => this.setState({ subscribemodal: true }), 2000);
    onGetChartsData("yearly");
  }


  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  togglesubscribemodal = () => {
    this.setState(prevState => ({
      subscribemodal: !prevState.subscribemodal,
    }))
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.state, chartSeries: this.props.chartsData })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | Stellar - A Beautiful Trucking App</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}

            <Breadcrumbs
              title={this.props.t("Dashboards")}
              breadcrumbItem={this.props.t("Dashboard")}
            />

            
            <Row>

              <Col xl="4">
                <WelcomeComp />
                
              </Col>
              <Col xl="8">
                
                <Row>
                  {/* Reports Render */}
                  {this.state.reports.map((report, key) => (
                    <Col md="4" key={"_col_" + key}>
                      {/*This is where reports menu is clickable*/}
                      <a href={report.url}>
                        <Card className="mini-stats-wid"  >
                          <CardBody>
                            <div className="d-flex">
                              <div className="flex-grow-1">
                                <p className="text-muted fw-medium">
                                  {report.title}
                                </p>
                                <h4 className="mb-0">{report.description}</h4>
                              </div>
                              <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                <span className="avatar-title">
                                  <i
                                    className={
                                      "bx " + report.iconClass + " font-size-24"
                                    }
                                  />
                                </span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </a>
                    </Col>
                  ))}
                </Row>

                
              </Col>
            </Row>

            
           
            
            <Row>
              <Col lg="12">
                <LatestTransaction />
              </Col>
            </Row>

          </Container>
        </div>

        <Modal
          isOpen={this.state.subscribemodal}
          role="dialog"
          autoFocus={true}
          data-toggle="modal"
          centered
          toggle={this.togglesubscribemodal}
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <button type="button" className="btn-close" onClick={() =>
                this.setState({ subscribemodal: false })
              } data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-4">

                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-light  rounded-circle text-primary h1">
                    <i className="bx bx-buildings"></i>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <h4 className="text-primary">Welcome Admin!</h4>
                    <p className="text-muted font-size-14 mb-4">
                      Please enter your company information below. This information
                      will be shared with all users.
                    </p>

                    <Form>
                      <FormGroup className="row mb-4">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Company
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            className="form-control"
                            id="horizontal-firstname-Input"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row mb-4">
                        <Label
                          htmlFor="horizontal-email-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Street
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="email"
                            className="form-control"
                            id="horizontal-email-Input"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row mb-4">
                        <Label
                          htmlFor="horizontal-password-Input"
                          className="col-sm-3 col-form-label"
                        >
                          City
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            className="form-control"
                            id="horizontal-password-Input"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row mb-4">
                        <Label
                          htmlFor="horizontal-password-Input"
                          className="col-sm-3 col-form-label"
                        >
                          State
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            className="form-control"
                            id="horizontal-text-Input"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row mb-4">
                        <Label
                          htmlFor="horizontal-text-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Zip Code
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            className="form-control"
                            id="horizontal-text-Input"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row mb-4">
                        <Label
                          htmlFor="horizontal-text-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Phone
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="tel"
                            className="form-control"
                            id="horizontal-password-Input"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row justify-content-end">
                        <Col sm={9}>
                          

                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              className="w-md"
                            >
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </FormGroup>
                    </Form>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.modal}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabindex="-1"
          toggle={this.togglemodal}
        >
          <div className="modal-content">
            <ModalHeader toggle={this.togglemodal}>Order Details</ModalHeader>
            <ModalBody>
              <p className="mb-2">
                Product id: <span className="text-primary">#SK2540</span>
              </p>
              <p className="mb-4">
                Billing Name:{" "}
                <span className="text-primary">Neal Matthews</span>
              </p>

              <div className="table-responsive">
                <Table className="table align-middle table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div>
                          <img src={modalimage1} alt="" className="avatar-sm" />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            Wireless Headphone (Black)
                          </h5>
                          <p className="text-muted mb-0">$ 225 x 1</p>
                        </div>
                      </td>
                      <td>$ 255</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div>
                          <img src={modalimage2} alt="" className="avatar-sm" />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            Hoodie (Blue)
                          </h5>
                          <p className="text-muted mb-0">$ 145 x 1</p>
                        </div>
                      </td>
                      <td>$ 145</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Sub Total:</h6>
                      </td>
                      <td>$ 400</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Shipping:</h6>
                      </td>
                      <td>Free</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Total:</h6>
                      </td>
                      <td>$ 400</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="secondary"
                onClick={this.togglemodal}
              >
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </React.Fragment >
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func
}

const mapStateToProps = ({ Dashboard }) => ({
  chartsData: Dashboard.chartsData,
})

const mapDispatchToProps = dispatch => ({
  onGetChartsData: (periodType) => dispatch(getChartsData(periodType)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(withTranslation()(Dashboard))

