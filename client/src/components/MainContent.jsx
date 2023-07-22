import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

// import image
import Discount from "../assets/image/Discount.png";
import Iklan from "../assets/image/IklanHarga.png";
import Rounded from "../assets/image/Rounded.svg";
import ListTiketKereta from "./ListTiketKereta";
import { useQuery } from "react-query";
import { API, DataKereta } from "../config/api";

function MainContent() {
  // handle usstate iklan
  const [iklan, setIklan] = useState(false);
  const handleIklanTrue = () => setIklan(true);
  const handleIklanFalse = () => setIklan(false);

  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({
    stasiun_awal: "",
    stasiun_akhir: "",
  });
  const { stasiun_awal, stasiun_akhir } = form;

  const getStations = async () => {
    try {
      const response = await API.get("/tickets");
      setStations(response.data.data.ticket);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [search, setSearch] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    stasiun_awal === "" && stasiun_akhir === ""
      ? setSearch(false)
      : setSearch(true);
  };

  useEffect(() => {
    getStations();
  }, []);

  return (
    <div>
      {/* Hero / Jumbotron */}
      <Container
        fluid
        style={{ background: "linear-gradient(to right, #EC7AB7, #EC7A7A)" }}
      >
        <Container className="p-5 text-white">
          <Row>
            <Col>
              <h2>Selamat Pagi, Ticket Seekers !</h2>
              <p className="mt-4">Ingin Pulkam dengan Good Deal ?</p>
              <p className="">Masuk atau Daftar Sekarang ! !</p>
            </Col>
            <Col className="position-relative">
              <img
                src={Discount}
                alt="Discount"
                className={!iklan ? "position-absolute " : "position-static"}
                style={{ left: -20, top: 20 }}
                onClick={handleIklanTrue}
              />
              <img
                src={Iklan}
                alt="Discount"
                className={!iklan ? "position-static " : "position-absolute"}
                onClick={handleIklanFalse}
                style={{ left: -20, top: 20 }}
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Form Kereta */}

      <Container style={{ marginTop: -20 }}>
        <Row>
          <Col>
            <Card style={{ overflow: "hidden" }}>
              <Row>
                {/* Colom Tiket Kereta Api */}
                <Col xs={3} style={{ backgroundColor: "#F2F2F2" }}>
                  <div
                    className="mt-3"
                    style={{ borderLeft: "5px solid #E67E22" }}
                  >
                    <p>Tiket Kereta Api</p>
                  </div>
                </Col>

                {/* Colom Form Pencarian tiket */}
                <Col className="p-4">
                  <h1>Tiket Kereta Api</h1>
                  <Form>
                    <Row>
                      <Col xs={5}>
                        <Form.Group className="mb-2">
                          <Form.Label>Asal</Form.Label>
                          <Form.Select
                           name="stasiun_awal"
                           value={stasiun_awal}
                           onChange={handleChange}
                          >
                            <option value="" selected hidden>
                              Pilih Stasiun Awal
                            </option>
                            {stations?.map((data) => (
                              <option
                                value={data.start_station}
                                key={data.start_station}
                              >
                                {data.start_station}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group className="mb-2">
                              <Form.Label>Tanggal Berangkat</Form.Label>
                              <Form.Control type="date" />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="d-flex mb-2">
                              <Form.Check type="checkbox" />
                              <Form.Label>Pulang Pergi</Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        xs={2}
                        className="d-flex justify-content-center mb-5"
                      >
                        <Button
                          style={{
                            backgroundColor: "Transparent",
                            border: "none",
                            color: "blue",
                          }}
                        >
                          <img
                            src={Rounded}
                            alt="rounded"
                            style={{ width: "3rem" }}
                          />
                        </Button>
                      </Col>

                      <Col xs={5}>
                        <Form.Group className="mb-2">
                          <Form.Label>Tujuan</Form.Label>
                          <Form.Select
                           name="stasiun_akhir"
                           value={stasiun_akhir}
                           onChange={handleChange}
                          >
                            <option value="" selected hidden>
                              Pilih Stasiun Akhir
                            </option>
                            {stations?.map((data) => (
                              <option
                                value={data.destination_station}
                                key={data.destination_station}
                              >
                                {data.destination_station}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        <Row>
                          <Col>
                            <Form.Group className="mb-2">
                              <Form.Label>Dewasa</Form.Label>
                              <Form.Select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group className="mb-2">
                              <Form.Label>Bayi</Form.Label>
                              <Form.Select>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group className="mb-2">
                              <Form.Label></Form.Label>
                              <Form.Control
                                type="submit"
                                onClick={handleClick}
                                value="Cari Tiket"
                                className="mt-2 text-white"
                                style={{
                                  background:
                                    "linear-gradient(to bottom, #EC7AB7, #EC7A7A)",
                                }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* list tiket kereta yang tersedia */}
      <ListTiketKereta stasiun_awal={stasiun_awal} stasiun_akhir={stasiun_akhir} search={search}/>
    </div>
  );
}

export default MainContent;
