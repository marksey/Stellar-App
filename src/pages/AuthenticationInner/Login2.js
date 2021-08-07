import React, { Component } from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';

//Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

import { Col, Container,Row  } from "reactstrap"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions"


// import images
import logodark from "../../assets/images/stellar-logo-dark.png"
import logolight from "../../assets/images/stellar-logo-white.png"
import CarouselPage from "./CarouselPage"

class Login2 extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    {console.log("Trying to login user!!!!", values)}
    this.props.loginUser(values, this.props.history)
  }

  render() {
    return (
      <React.Fragment>
        <div>
        <MetaTags>
            <title>Login 2 | Stellar - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container fluid className="p-0">
            <Row className="g-0">
              <CarouselPage />

              <Col xl={3}>
                <div className="auth-full-page-content p-md-5 p-4">
                  <div className="w-100">
                    <div className="d-flex flex-column h-100">
                      <div className="mb-4 mb-md-5">
                        <Link to="dashboard" className="d-block auth-logo">
                          <img
                            src={logodark}
                            alt=""
                            height="30"
                            className="center auth-logo-dark"
                            style={{marginLeft:'auto', marginRight:'auto'}}
                          />
                          <img
                            src={logolight}
                            alt=""
                            height="25"
                            className="auth-logo-light"
                          />
                        </Link>
                      </div>

                                    <div className="my-auto">
                                        <div>
                                            <h5 className="text-primary">Welcome Back!</h5>
                                            <p className="text-muted">Sign in to continue to Stellar.</p>
                                        </div>
            
                                        <div className="mt-4">

                                        <AvForm 
                                          className="form-horizontal"
                                          onValidSubmit={this.handleValidSubmit}
                                        >
                                        {this.props.error && this.props.error ? (
                                          <Alert color="danger">{this.props.error}</Alert>
                                        ) : null}

                                      <div className="mb-3">
                                      <AvField  name="email"    
                                                label="Email"
                                                value=""
                                                className="form-control"
                                                placeholder="Enter email"
                                                type="email"
                                                required
                                                />
                                      </div>

                                      <div className="mb-3">
                                      <div className="float-end">
                                           <Link to="/pages-forgot-pwd-2" className="text-muted">Forgot password?</Link>
                                      </div>
                                      <AvField  name="password"    
                                                label="Password"
                                                value=""
                                                className="form-control"
                                                placeholder="Enter password"
                                                type="password"
                                                required
                                                />
                                      </div>
                                                  <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="remember-check" />
                                                    <label className="form-check-label" htmlFor="remember-check">
                                                        Remember me
                                                    </label>
                                                </div>

                                          <div className="mt-3 d-grid">
                                          <button className="btn btn-primary btn-block" type="submit" > Log In </button>
                                        </div>

                                       </AvForm>
                                            <div className="mt-5 text-center">
                                                <p>Don't have an account? <a href="pages-register-2" className="fw-medium text-primary"> Signup now </a> </p>
                                            </div>
                                        </div>
                                    </div>


                      <div className="mt-4 mt-md-5 text-center">
                        <p className="mb-0">
                          © {new Date().getFullYear()} Stellar.<br></br><br></br> Crafted with{" "}
                          <i className="mdi mdi-heart text-danger"></i> by
                          Mark & Tanya
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login2.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}


const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login2)
)