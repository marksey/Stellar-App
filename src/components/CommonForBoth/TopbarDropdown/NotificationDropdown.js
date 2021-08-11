import PropTypes from 'prop-types'
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar2 from "../../../assets/images/users/avatar-2.jpg"
import avatar3 from "../../../assets/images/users/avatar-3.jpg"


//i18n
import { withTranslation } from "react-i18next"

class NotificationDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }
  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="dropdown d-inline-block"
          tag="li"
        >
          <DropdownToggle
            className="btn header-item noti-icon"
            tag="button"
            id="page-header-notifications-dropdown"
          >
            <i className="bx bx-bell bx-tada" />
            <span className="badge bg-danger rounded-pill">3</span>
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0"> {this.props.t("Notifications")} </h6>
                </Col>
                <div className="col-auto">
                  <a href="#" className="small">
                    {" "}
                    View All
                  </a>
                </div>
              </Row>
            </div>

            <SimpleBar style={{ height: "230px" }}>

              <Link to="" className="text-reset notification-item">
                
                <div className="media">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bxs-truck" />
                    </span>
                  </div>

                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {this.props.t("One hour until delivery.")}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {this.props.t(
                          "Load # SK87231"
                        )}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {this.props.t("3 min ago")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="" className="text-reset notification-item">
                <div className="media">
                  <img
                    src={avatar3}
                    className="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">Vasya Kishchenko</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {this.props.t('"Yo! Comchek received."')}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {this.props.t("30 mins ago")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="" className="text-reset notification-item">
                <div className="media">
                  <div className="avatar-xs me-3">
                  <img
                    src={avatar2}
                    className="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {this.props.t("Michael Todd")}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {this.props.t('"Picked up the load. Omw to Tulsa, OK."')}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {this.props.t("45 min ago")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="" className="text-reset notification-item">
                
                <div className="media">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bxs-truck" />
                    </span>
                  </div>

                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {this.props.t("One hour until delivery.")}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {this.props.t(
                          "Load # SK53239"
                        )}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {this.props.t("50 mins ago")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="" className="text-reset notification-item">
                <div className="media">
                  <img
                    src={avatar3}
                    className="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">Vasya Kishchenko</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {this.props.t('"Tipa. I\'m going to have to cancel this load."') }
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {this.props.t("2 hrs ago")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

            </SimpleBar>
            <div className="p-2 border-top d-grid">
              <Link className="btn btn-sm btn-link font-size-14 text-center" to="#">
                <i className="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">{this.props.t("View More..")}</span>
              </Link>
            </div>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

NotificationDropdown.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(NotificationDropdown)
