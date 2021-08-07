import React, { Component } from "react"
import { Row, Col } from "reactstrap"

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container-fluid">
            <Row>
              <Col sm={6}>{new Date().getFullYear()} © Stellar.</Col>
              <Col sm={6}>
                <div className="text-sm-end d-none d-sm-block">
                  Designed and Developed with{" "}
                    <i className="mdi mdi-heart text-danger" /> by Mark & Tanya
              </div>
              </Col>
            </Row>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default Footer;