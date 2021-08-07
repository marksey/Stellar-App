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

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

// Pages Components

import LoadsList from "./LoadsList"


//i18n
import { withTranslation } from "react-i18next"
import classNames from "classnames";

class Loads extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reports: [
        { title: "Trucks Schedule", 
          iconClass: "bx bxs-truck", 
          description: "19" ,
          url: "/trucks-schedule",
        },
        {
          title: "In Transit",
          iconClass: "bx bx-transfer",
          description: "77",
          url: "/in-transit",
        },
        {
          title: "Completed",
          iconClass: "bx bxs-calendar-heart",
          description: "365",
          url: "/completed",
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
    //onGetChartsData("yearly");
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
              title={this.props.t("Loads")}
              breadcrumbItem={this.props.t("Loads")}
            />

            <Row>
              <Col lg="12">
                <LoadsList />
              </Col>
            </Row>

          </Container>
        </div>

        

        
      </React.Fragment >
    )
  }
}

Loads.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func
}

const mapStateToProps = ({ Loads }) => ({
  //chartsData: Dashboard.chartsData,
})

const mapDispatchToProps = dispatch => ({
  //onGetChartsData: (periodType) => dispatch(getChartsData(periodType)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(withTranslation()(Loads))

