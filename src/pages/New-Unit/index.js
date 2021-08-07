import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//common
import TextualInputs from "../Forms/FormElements/TextualInputs"

class FormElements extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customchk: true,
      defaultchl: true,
      toggleSwitch: true,
      toggleSwitchSize: true,
      toggleSwitchLarge: true,

      //checkbox categories
      defaultCheckPrimary: true,
      defaultCheckSuccess: true,
      defaultCheckInfo: true,
      defaultCheckWarning: true,
      defaultCheckDanger: true,
      defaultOutlinePrimary: true,
      defaultOutlineInfo: true,
      defaultOutlineWarning: true,
      defaultOutlineDanger: true,
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Form Elements | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Add New Unit" />

            <Row>
              <Col>
                <TextualInputs />
              </Col>
            </Row>
            
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default FormElements
