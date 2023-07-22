import React from "react";
import { Modal, Button, Row, Col  } from "react-bootstrap";

// import image
import BrandWhite from "../../../assets/image/BrandWhite.png"
import QrModal from "../../../assets/image/QrModal.png"
import { useQuery } from "react-query";
import { API } from "../../../config/api";

function AdminModalInvoice(props) { 


  const {data: transaksiList} = useQuery("transaksiIdCache", async () => {
    const response = await API.get(`/transactions`)
    console.log("apa ini", response);
    return response.data.data.user
  })

  console.log(transaksiList);


  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {transaksiList?.filter((transaksi) => transaksi.id === props.id)?.map((data, index) =>
          <div style={{ width: "673px", height: "671px", background: "#fff" }}>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "186px",
              height: "34.312px",
              borderRadius: "0 0 50px ",
              background: "linear-gradient(180deg, #EC7A7A, #EC7AB7",
            }}
          >
            <img src={BrandWhite} alt="BrandWhite" />
          </div>
          <Button
            style={{
              background: "none",
              border: "none",
              color: "red",
              top: 0,
              right: 0,
            }}
            className="position-absolute"
          >
            <h1>X</h1>
          </Button>
          <Row className="p-4">
            <Col>
              <Row>
                <Col>
                  <h2>Invoice</h2>
                  <p>Kode Invoice : INV0101</p>
                </Col>
              </Row>
              <Row>
                <Col xs={8}>
                  <Row>
                    <Col>
                      <h5>Kereta Api</h5>
                      <p>Saturday, {data.ticket.start_date}</p>
                    </Col>
                    <Col>
                      <img src={QrModal} alt="QrModal" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h5>{data.ticket.name_train}</h5>
                      <p>{data.ticket.type_train}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={1}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "16px",
                          backgorund: "none",
                          border: "1px solid #EC7AB7",
                        }}
                      ></div>
                    </Col>
                    <Col>
                      <h5>{data.ticket.start_time}</h5>
                      <p>21 Febuari 2020</p>
                    </Col>
                    <Col>
                      <h5>Stasiun {data.ticket.start_station}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="position-relative">
                      <div
                        style={{
                          width: "2px",
                          height: "53px",
                          background: "#ddd",
                          bottom: 1,
                          left: 19,
                        }}
                        className="position-absolute"
                      ></div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={1}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "16px",
                          background:
                            "linear-gradient(180deg, #EC7A7A, #EC7AB7)",
                        }}
                      ></div>
                    </Col>
                    <Col>
                      <h5>{data.ticket.arrival_time}</h5>
                      <p>21 Febuari 2020</p>
                    </Col>
                    <Col>
                      <h5>Stasiun {data.ticket.destination_station}</h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="position-relative">
            <Col className="d-flex justify-content-center mx-auto">
              <div
                style={{
                  width: "780px",
                  height: "86px",
                  borderTop: "1px solid #000000",
                  borderBottom: "1px solid #000000",
                  left: 20,
                  top: 20,
                }}
                className="position-absolute"
              >
                <Row className="mt-3">
                  <Col>
                    <h5>No. Pelanggan</h5>
                    <p>31175033003970001</p>
                  </Col>
                  <Col>
                    <h5>Nama Pemesan</h5>
                    <p>{data.user.fullname}</p>
                  </Col>
                  <Col>
                    <h5>No. Handphone</h5>
                    <p>{data.user.phone_number}</p>
                  </Col>
                  <Col>
                    <h5>Email</h5>
                    <p>{data.user.email}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="position-relative">
              <div
                style={{
                  width: "655px",
                  height: "46px",
                  background: "#E6E6E6",
                  top: 150,
                  left: 75,
                }}
                className="position-absolute"
              >
                <Row>
                  <Col>
                    <h2 className="ms-4">Total</h2>
                  </Col>
                  <Col>
                    <h2 className="text-end me-4" style={{ color: "red"}}>
                      Rp.{data.ticket.price}
                    </h2>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        )}
        
      </Modal>
    </div>
  );
}

export default AdminModalInvoice;
