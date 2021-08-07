import React, { Component } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"

export default class CarouselPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Col xl={9}>
          <div className="auth-full-bg pt-lg-5 p-4">
            <div className="w-100">
              <div className="bg-overlay"></div>
              <div className="d-flex h-100 flex-column">
                <div className="p-4 mt-auto">
                  <div className="row justify-content-center">
                    <div className="col-lg-7">
                      <div className="text-center">
                        <h4 className="mb-3">
                          <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                          <span className="text-primary">The only </span>trucking app you need
                        </h4>
                        <div dir="ltr">
                          <Carousel showThumbs={false} className="slider_css">
                            <div>
                              <div className="item">
                                <div className="py-3">
                                  <p className="font-size-16 mb-4">
                                    " Stellar is a trucking app that allows you 
                                    to be a more effective dispatcher. Boost productivity
                                    and easily keep track of what's happening with
                                    your fleet. Find out why this app is taking the
                                    market by storm!"
                                </p>

                                  <div>
                                    <h4 className="font-size-16 text-primary">
                                      David K.
                                  </h4>
                                    <p className="font-size-14 mb-0">
                                      - Dispatcher & Stellar User
                                  </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="item">
                                <div className="py-3">
                                  <p className="font-size-16 mb-4">
                                    "If every trucking company used Stellar, 
                                    they would benefit enormously. "
                                </p>

                                  <div>
                                    <h4 className="font-size-16 text-primary">
                                      Vasya K.
                                  </h4>
                                    <p className="font-size-14 mb-0">
                                      - Owner-Op
                                  </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </React.Fragment>
    )
  }
}
