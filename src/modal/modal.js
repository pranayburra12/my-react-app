import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import './modal.css'

const ModalComponent = (props) => {

  const {show,onHide} =props
  return (
    <>
      <Modal
        dialogClassName=""
        show={show}
        onHide={onHide}
        centered
      >
        <div className="confirmation-modal">
          <Modal.Header closeButton className="text-lg text-slate-200">
          Are you sure? to continue
          </Modal.Header>
          <Modal.Footer>
            <div className="footer">
                <button className="cancel" onClick={onHide}>{props.cancel}</button>
                <button className="save" onClick={props.onSubmit}>{props.save}</button>
            </div>

          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
  }
export default ModalComponent;
