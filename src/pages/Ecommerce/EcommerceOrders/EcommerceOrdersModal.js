import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import img7 from "../../../assets/images/product/img-7.png"
import img4 from "../../../assets/images/product/img-4.png"

const EcommerceOrdersModal = props => {
  const { isOpen, toggle } = props
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
        <ModalHeader toggle={toggle}>Are You Sure?</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Are you sure you want to complete this load? 
          </p>

          <p className="mb-2">
            Doing so will complete the load.
          </p>
          

          
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

EcommerceOrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default EcommerceOrdersModal
