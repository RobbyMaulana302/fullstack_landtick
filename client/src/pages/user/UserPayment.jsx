import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// import image
import BrandWhite from "../../assets/image/BrandWhite.png";
import QrPembayaran from "../../assets/image/QrPembayaran.png";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/Api";
import { useEffect } from "react";

function UserPayment() {
  const navigate = useNavigate()
  let param = useParams()
  let id = parseInt(param.id)

  let {data: transactionInovice} = useQuery(["transactionInvoiceCache", id], async() => {
    const response = await API.get(`/transaction/${id}`)
    console.log(response);

    return response.data.data.transaction
  })

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation (async () => {
    try {

      const response = await API.get(`/getpayment/${id}`);
      
      const token = response.data.data.token;
      console.log("ini token", token)

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onError: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onClose: function () {
          alert("tutup")
        },
      });
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div>
      <Container>
        <h2 className="mt-5">Invoice</h2>
        <Row>
          <Col xs={8}>
            <Row>
              <Col className="mt-5">
                <Card>
                  <Card.Body>
                    <div
                      className="position-absolute d-flex justify-content-center"
                      style={{
                        top: -1,
                        left: 0,
                        width: "186px",
                        height: "34.312px",
                        flexShrink: 0,
                        background: "#EC7A7A",
                        borderRadius: "0 0 50px 0 ",
                      }}
                    >
                      <img src={BrandWhite} alt="VectorTiket" />
                    </div>
                    <Row>
                      <Col className="d-flex justify-content-end">
                        <div>
                          <h1>Kereta Api</h1>
                          <p>Saturday, 21 Februari 2020</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={3}>
                        <h6>No. Tanda Pengenal</h6>
                      </Col>
                      <Col xs={3}>
                        <h6>Nama Pemesan</h6>
                      </Col>
                      <Col xs={3}>
                        <h6>No. Handphone</h6>
                      </Col>
                      <Col>
                        <h6>Email</h6>
                      </Col>
                      <div
                        style={{
                          width: "796px",
                          height: "1px",
                          background: "#B7B7B7",
                        }}
                      ></div>
                    </Row>
                    <Row>
                      <Col xs={3}>
                        <p>31175033003970001</p>
                      </Col>
                      <Col xs={3}>
                        <p>{transactionInovice?.user?.fullname}</p>
                      </Col>
                      <Col xs={3}>
                        <p>{transactionInovice?.user?.phone_number}</p>
                      </Col>
                      <Col>
                        <p>{transactionInovice?.user?.email}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Row>
                  <Col>
                    <Row>
                      <Col className="mt-5">
                        <h1>Rincian Harga</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={8} className="mt-3">
                        <Card>
                          <Card.Body>
                            <Row>
                              <Col>
                                <h6>{transactionInovice?.ticket?.name_train} (Dewasa) x1</h6>
                              </Col>
                              <Col>
                                <h6>Rp. {transactionInovice?.ticket?.price}</h6>
                              </Col>
                            </Row>
                          </Card.Body>
                          <Card.Footer>
                            <Row>
                              <Col>
                                <h6>Total</h6>
                              </Col>
                              <Col>
                                <h6>Rp. {transactionInovice?.ticket?.price}</h6>
                              </Col>
                            </Row>
                          </Card.Footer>
                        </Card>
                        <Row className="mt-3">
                          <Col className="d-flex align-items-center justify-content-center">
                            <Button
                              style={{
                                width: "446px",
                                height: "40px",
                                borderRadius: "5px",
                                background:
                                  "linear-gradient(90deg, #EC7AB7 0%, #EC7A7A 100%)",
											          border: "none"
                              }}

                              onClick={() => handleBuy.mutate(id)}
                            >
                              Bayar Sekarang
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xs={4} className="mt-5">
            <div
              style={{ background: "#F5F5F5", width: "447px", height: "414px" }}
            >
              <div
                style={{
                  width: "447px",
                  height: "115px",
                  background: "#D0D0D0",
                }}
              >
                <Row>
                  <Col className="p-3" xs={8}>
                    <h2>Kereta Api</h2>
                    <p>Saturday, 21 September 2020</p>
                  </Col>
                  <Col className="p-3 me-5 text-end">
                    <img src={QrPembayaran} alt="QrPembayaran" />
                    <p>INV0101</p>
                  </Col>
                </Row>
              </div>
              <div className="p-4">
                <Row>
                  <Col>
                    <h3>{transactionInovice?.ticket?.name_train}</h3>
                    <p>{transactionInovice?.ticket?.type_train}(H)</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "16px",
                        border: "1px solid #EC7AB7 ",
                      }}
                    ></div>
                  </Col>
                  <Col>
                    <h5>{transactionInovice?.ticket?.start_time}</h5>
                    <p>21 Februari 2020</p>
                  </Col>
                  <Col>
                    <h5>Stasiun {transactionInovice?.ticket?.start_station}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col className="position-relative" xs={1}>
                    <div
                      className="position-absolute"
                      style={{
                        width: "1px",
                        height: "55px",
                        background: "#D0D0D0",
                        left: 19,
                        bottom: 0,
                      }}
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
                        background: "linear-gradient(180deg, #EC7AB7, #EC7A7A)",
                      }}
                    ></div>
                  </Col>
                  <Col>
                    <h5>10.05</h5>
                    <p>21 Februari 2020</p>
                  </Col>
                  <Col>
                    <h5>Stasiun {transactionInovice?.ticket?.destination_station}</h5>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserPayment;
