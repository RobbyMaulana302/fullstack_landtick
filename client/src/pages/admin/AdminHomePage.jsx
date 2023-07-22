import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";

// import react icon
import { ImSearch } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import AdminModalInvoice from "./modals/AdminModalInvoice";
import AdminModalStatus from "./modals/AdminModalStatus";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import DeleteData from "../../components/modals/Delete";

function AdminHomePage() {
  // handle modal

  const [modalInvoice, setModalInvoice] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState(false);

  const [transaksiId, setTransaksiId] = useState(null);
  console.log("transaksi ID", transaksiId);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const { data: transaksi } = useQuery("transaksiCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.data.data.user);
    return response.data.data.user;
  });

  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/transaction/${id}`);
      console.log(response);

      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div>
      <Container className="my-5">
        <h1>List Transaksi</h1>
        <Table className="my-5 table-striped text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Tiket</th>
              <th>Bukti Transfer</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transaksi?.map((data, index) => (
              <tr key={data.id}>
                  <td>{index + 1}</td>
                <td>{data.user.fullname}</td>
                <td>
                  {data.ticket.start_station} - {" "}
                  {data.ticket.destination_station}
                </td>
                <td>bcs.jpg</td>
                <td>{data.status}</td>
                <td>
                  <Button
                    style={{ background: "none", border: "none" }}
                    onClick={() => {
                      setModalInvoice(true);
                      setTransaksiId(data?.id);
                    }}
                  >
                    <ImSearch
                      style={{ color: "#2FC5F7", fontSize: "1.3rem" }}
                    />
                  </Button>
                  <Button
                    style={{ background: "none", border: "none" }}
                    onClick={() => setModalStatus(true)}
                  >
                    <BiEdit style={{ color: "#0ACF83", fontSize: "2rem" }} />
                  </Button>
                  <Button
                    style={{ background: "none", border: "none" }}
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    <MdDeleteForever
                      style={{ color: "#FF0742", fontSize: "2rem" }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AdminModalInvoice
          show={modalInvoice}
          onHide={() => setModalInvoice(false)}
          id={transaksiId}
        />
        <AdminModalStatus
          show={modalStatus}
          onHide={() => setModalStatus(false)}
        />-
        <DeleteData
          setConfirmDelete={setConfirmDelete}
          show={show}
          handleClose={handleClose}
        />
      </Container>
    </div>
  );
}

export default AdminHomePage;
