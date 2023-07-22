import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { DataKeretaContext } from "../context/dataKeretaContext";

// import image
import Arrow from "../assets/image/Arrow.svg";
import TiketModal from "../pages/user/modals/TiketModal";
import { UserContext } from "../context/userContext";
import Login from "./modals/Login";
import { API } from "../config/Api";
import { useQuery } from "react-query";

function ListTiketKereta({ stasiun_awal, stasiun_akhir, search }) {
  console.log("ini stasiun awal:", stasiun_awal);
  console.log("ini stasiun akhir:", stasiun_akhir);
  console.log("ini stasiun search:", search);




  const [showModalTiket, setShowModalTiket] = useState(false);

  const handleCloseModalTiket = () => setShowModalTiket(false);
  const handleShowModalTiket = () => setShowModalTiket(true);

  const [state, _] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const [ticketID, setTicketID] = useState(null);

  let { data: tickets, refetch } = useQuery("ticketCache", async () => {
    const response = search
      ? await API.get(
          `/filter?startStation=${stasiun_awal}&destinationStation=${stasiun_akhir}`
        )
      : await API.get("/tickets");
    return response.data.data.ticket;
  });

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <div>
      <Container fluid className="mt-4 text-center ">
        <Row className="">
          <Col xs={2}>
            <h5>Nama Kereta</h5>
          </Col>
          <Col xs={2}>
            <h5>Berangkat</h5>
          </Col>
          <Col xs={1}></Col>
          <Col xs={2}>
            <h5>Tiba</h5>
          </Col>
          <Col xs={2}>
            <h5>Durasi</h5>
          </Col>
          <Col xs={3}>
            <h5>Harga Per orang</h5>
          </Col>
        </Row>

        {/* Data tiket yang tersedia */}
        {tickets?.map((data) => (
          <Card
            className="my-3"
            style={{ cursor: "pointer" }}
            key={data?.id}
            onClick={
              state?.isLogin
                ? () => {
                    handleShowModalTiket();
                    setTicketID(data.id);
                  }
                : () => setShowLogin(true)
            }
          >
            <Row className="my-3">
              <Col xs={2}>
                <h5>{data?.name_train}</h5>
                <p>{data?.type_train}</p>
              </Col>
              <Col xs={2}>
                <h5>{data?.start_time}</h5>
                <p>{data?.start_station}</p>
              </Col>
              <Col
                xs={1}
                className="d-flex align-item-center justify-content-center"
              >
                <img src={Arrow} alt="Arrow" style={{ width: "1.5rem" }} />
              </Col>
              <Col xs={2}>
                <h5>{data?.arival_time}</h5>
                <p>{data?.destination_station}</p>
              </Col>
              <Col xs={2}>
                <h5>
                  {parseInt(data?.arival_time) < parseInt(data?.start_time)
                    ? parseInt(data?.start_time) - parseInt(data?.arival_time)
                    : parseInt(data?.arival_time) - parseInt(data?.start_time)}
                  Jam
                </h5>
              </Col>
              <Col xs={3}>
                <h5>Rp. {data?.price}</h5>
              </Col>
            </Row>
          </Card>
        ))}
        {state?.isLogin ? (
          <TiketModal
            showModal={showModalTiket}
            onHideModal={handleCloseModalTiket}
            id={ticketID}
          />
        ) : (
          <Login show={showLogin} showLogin={setShowLogin} />
        )}
      </Container>
    </div>
  );
}

export default ListTiketKereta;
