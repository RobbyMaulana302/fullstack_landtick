import React, { useState } from "react";
import { Alert, Container,  Form } from "react-bootstrap";
import { API, DataKereta } from "../../config/api";
import { useMutation, useQuery } from "react-query";

function AdminTambahTiket() {
  const [message, setMessage] = useState(null)

  const [form, setForm] = useState({
    name_train: '',
    type_train: '',
    start_date: '',
    start_station: '',
    start_time: '',
    destination_station: '',
    arival_time: '',
    price: '',
    qty: '',
  })

  const {name_train, type_train, start_date, start_station, start_time, destination_station, arival_time, price, qty} = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try{
      e.preventDefault()

      const response = await API.post("/ticket", form)
      console.log(response);  
      
      const alert = (
        <Alert variant="success" className="py-1">
          Add Ticket Success
        </Alert>
      )
      setMessage(alert)
      
      setForm({
        name_train: '',
        type_train: '',
        start_date: '',
        start_station: '',
        start_time: '',
        destination_station: '',
        arival_time: '',
        price: '',
        qty: '',
      })

    } catch(error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Add Ticket Failed
        </Alert>
      )
      setMessage(alert)
      console.log("Add ticket failed : ", error);
    }
  })


  let {data: keretaApi} = useQuery("keretaApiChache", async () => {
    const response = await DataKereta.get()
    return response.data
 })

  return (
    <div>
      <Container className="my-5">
        {message && message}
        <h1 className="mb-5">Tambah Tiket</h1>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Nama Kereta" value={name_train} name="name_train" onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select value={type_train} name="type_train" onChange={handleChange}>
              <option hidden>
                Jenis Kereta
              </option>
              <option value="Eksekutif (H) " onChange={handleChange}>Eksekutif (H)</option>
              <option value="Ekonomi (E)" onChange={handleChange}>Ekonomi (E)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="date" placeholder="Tanggal Keberangkatan" value={start_date} name="start_date"onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select value={start_station} name="start_station" onChange={handleChange}>
              <option selected>Stasiun Awal</option>
              {keretaApi?.map((data) => <option value={data.name} onChange={handleChange} key={data?.name}>{data.name}</option> )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="time" placeholder="Jam Keberangkatan" value={start_time} name="start_time" onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select value={destination_station} name="destination_station" onChange={handleChange}>
              <option selected>Stasiun Akhir</option>
              {keretaApi?.map((data) => <option value={data.name} onChange={handleChange} key={data?.name}>{data.name}</option> )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="time" placeholder="Jam Tiba" value={arival_time} name="arival_time" onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Harga Tiket" value={price} name="price" onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="number" placeholder="Qty" value={qty} name="qty" onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-center">
            <Form.Control
              type="Submit"
              value="save"
              style={{
                width: "535px",
                height: "50px",
                borderRadius: "5px",
                background: "#0ACF83",
                color: "#FFF",
                fontSsize: "24px",
                fontFamily: "Avenir",
              }}
            />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default AdminTambahTiket;
