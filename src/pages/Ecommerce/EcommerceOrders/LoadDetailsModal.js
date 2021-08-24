import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Row,
  Col,
} from "reactstrap"
import img7 from "../../../assets/images/product/img-7.png"
import img4 from "../../../assets/images/product/img-4.png"
import { AvForm, AvField } from "availity-reactstrap-validation"

//This page is not used right now! Eventually modularize out the modal to here
const LoadDetailsModal = props => {
  const { isOpen, toggle, loads } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >

      <div className="modal-content">
        <ModalHeader toggle={toggle}>View Details Modal</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            This is the modal for viewing load details. You will fill this out.
          </p>
          <AvForm>
            <Row form>
              <Col className="col-12">
                <div className="mb-3">

                  <AvField
                    name="age"
                    label="Trip #"
                    type="text"
                    errorMessage="Invalid age"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.tripNum || ""}
                  />
                </div>
                <div className="mb-3">

                  <AvField
                    name="carrier"
                    label="Truck #"
                    type="text"
                    errorMessage="Invalid Truck #"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.truckNum || ""}
                  />
                </div>

                
                <div className="mb-3">
                  <AvField
                    name="owner"
                    label="Trailer #"
                    type="text"
                    errorMessage="Invalid Owner"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.trailerNum || ""}
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="make"
                    label="Customer"
                    type="text"
                    errorMessage="Invalid Make"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.customer || ""}
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="plateNum"
                    label="Pickup"
                    type="text"
                    errorMessage="Invalid Plate #"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.pickupLocation || ""}
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="state"
                    label="Delivery"
                    type="text"
                    errorMessage="Invalid Delivery"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.deliveryLocation || ""}
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="vinNum"
                    label=" Rate"
                    type="text"
                    errorMessage="Invalid Load Rate"
                    validate={{
                      required: { value: true },
                    }}
                    value={loads.loadRate || ""}
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
                    Save changes
                  </button>
                </div>
              </Col>
            </Row>
          </AvForm>
        
          
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={toggle}>
            Complete
          </Button>
        </ModalFooter>
      </div>
    

    </Modal>
    
  )
}

LoadDetailsModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  loads: PropTypes.any,
}

export default LoadDetailsModal
