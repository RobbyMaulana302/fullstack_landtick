import React from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../config/api";

function TiketModal(props) {
  const navigate = useNavigate()

  const handleBuy = useMutation(async (e) => {
    try{
      e.prevenDefault
    
      let form = new FormData()
  
      form.set("ticket_id", props.id)
  
      let response = await API.post("/transaction", form)
      navigate(`/user/tiket-saya`)
  
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  })


  return (
    <div>
      <Modal show={props.showModal} onHide={props.onHideModal}>
        <Modal.Body>
         Tiket anda berhasil di tambahkan silakan segera melakukan 
         pembayaran <span onClick={(e) => handleBuy.mutate(e)} style={{cursor:"pointer", fontWeight: "bold"}}>Klick disini</span>
         {/* <Link to="/user/tiket-saya">Klik disini</Link> */}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TiketModal;
