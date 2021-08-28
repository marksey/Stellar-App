import React, { Component } from "react"
import PropTypes, { bool } from 'prop-types'
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



// Pages Components
import WelcomeComp from "./WelcomeComp"
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
    //const { onGetChartsData } = this.props
    const displayAdminPopup = localStorage.getItem("displayAdminPopup")
    if (displayAdminPopup){
      setTimeout(() => this.setState({ subscribemodal: true }), 2000);
      localStorage.removeItem("displayAdminPopup") //No longer display admin pop-up
    }
    
    //onGetChartsData("yearly");
  }


  togglemodal = () => {
    console.log("Inside toggle modal!!!!")
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
      //this.setState({ ...this.state, chartSeries: this.props.chartsData })
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

        
      </React.Fragment >
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

const mapStateToProps = ({ Dashboard }) => ({
 // chartsData: Dashboard.chartsData,
})

const mapDispatchToProps = dispatch => ({
 // onGetChartsData: (periodType) => dispatch(getChartsData(periodType)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(withTranslation()(Dashboard))

