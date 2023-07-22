import React from "react";
import { Modal, Form } from "react-bootstrap";

// import image
import BrandWhite from "../../../assets/image/BrandWhite.png"



function AdminModalStatus(props) {
  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="position-relative">
          <div
            className="d-flex align-items-center justify-content-center position-relative"
            style={{
              width: "186px",
              height: "34.312px",
              borderRadius: "5px 0 50px 0",
              background: "linear-gradient(180deg, #EC7A7A, #EC7AB7",
              left: -16,
              top: -16,
            }}
          >
            <img src={BrandWhite} alt="BrandWhite" />
          </div>
          <Form>
            <Form.Group className="mb-3 mt-5">
              <Form.Control type="text" value="1" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" value="anto" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" value="Surabaya - Jakarta" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" value="bca.jpg" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select>
                <option value="Approve">Approve</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                type="submit"
                value="Save"
                style={{
                  borderRadius: "5px",
                  background: "#0ACF83",
                  color: "white",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminModalStatus;
