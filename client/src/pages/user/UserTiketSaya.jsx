import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// import image
import BrandWhite from "../../assets/image/BrandWhite.png";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function UserTiketSaya() {
  const navigate = useNavigate()

  const {data: myTicket} = useQuery("myticketCache", async () => {
    const response = await API.get("/ticket/my-ticket")
    console.log("disini", response);
    return response.data.data
  })

  return (
    <div>
      <Container className="py-5">
      {myTicket?.map((data) => (
        <Card className="mb-4" key={data?.id}>
          <Card.Body className="position-relative">
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
                  <p>Saturday, {data?.ticket?.start_date}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <h4>{data?.ticket?.name_train}</h4>
                <p>{data?.ticket?.type_train}</p>
                <div
                  className=""
                  style={{
                    background:
                      "linear-gradient(180deg, #F7941E 0%, #DC7D0B 100%)",
                    width: "69px",
                    height: "24px",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontSize: "12px",
                      fontFamily: "Avenir",
                      fontWeight: "500",
                    }}
                  >
                    {data?.status}
                  </p>
                </div>
              </Col>
              <Col className="position-relative" xs={1}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    flexShrink: 0,
                    borderRadius: "16px",
                    border: "1px solid #EC7AB7",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    border: "1px solid #D0D0D0",
                    transform: "rotate(90deg)",
                    top: 50,
                    left: -5,
                  }}
                  className="position-absolute"
                ></div>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    flexShrink: 0,
                    borderRadius: "16px",
                    background: "#EC7A7A",
                    top: 85,
                  }}
                  className="position-absolute"
                ></div>
              </Col>
              <Col xs={2}>
                <h4>{data?.ticket?.start_time}</h4>
                <p>21 Februari 2020</p>
                <h4>{data?.ticket?.arrival_time}</h4>
                <p>21 Februari 2020</p>
              </Col>
              <Col>
                <h4>Stasiun {data?.ticket.start_station}</h4>
                <h4 className="my-5">Stasiun {data?.ticket.destination_station}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <h6>No. Tanda Pengenal</h6>
              </Col>
              <Col xs={2}>
                <h6>Nama Pemesan</h6>
              </Col>
              <Col xs={2}>
                <h6>No. Handphone</h6>
              </Col>
              <Col>
                <h6>Email</h6>
              </Col>
              <div
                style={{ width: "796px", height: "1px", background: "#B7B7B7" }}
              ></div>
            </Row>
            <Row>
              <Col xs={2}>
                <p>31175033003970001</p>
              </Col>
              <Col xs={2}>
                <p>{data?.user.fullname}</p>
              </Col>
              <Col xs={2}>
                <p>{data?.user.phone_number}</p>
              </Col>
              <Col>
                <p>{data?.user.email}</p>
              </Col>
              <Col>
                  <Button
                  onClick={() => navigate(`/user/payment/${data?.id}`)}
                    style={{
                      width: "206px",
                      height: "40px",
                      flexShrink: 0,
                      borderRadius: "5px",
                      background:
                        "linear-gradient(90deg, #EC7AB7 0%, #EC7A7A 100%)",
                      border: "none",
                    }}
                  >
                    Bayar Sekarang
                  </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      </Container>
    </div>
  );
}

export default UserTiketSaya;
