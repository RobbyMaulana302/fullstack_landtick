import react from "react"
import { Modal, Form, Alert } from "react-bootstrap"

// useMutation
import { useMutation } from "react-query"

// import API
import { API } from "../../config/api"
import { useState } from "react"

export default function Registrasi(props) {
    
    const [message, setMessage] = useState(null)

    const [form, setForm] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        phone_number: '',
        address: '',
    })

    const {fullname, username, email, password, gender, phone_number, address} = form


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const response = await API.post("/register", form)
            console.log(response);

            const alert = (
                <Alert variant="success" className="py-1">
                    Register Success!
                </Alert>
            )
            setMessage(alert)

            setForm({
                fullname: '',
                username: '',
                email: '',
                password: '',
                gender: '',
                phone_number: '',
                address: '',
            })
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed to Register!
                </Alert>
            )
            setMessage(alert)
            console.log("Register failed :", error);
            
        }
    })


    return(
        <>
            <Modal show={props.show} onHide={props.showLogin} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body style={{ overflowY: 'auto'}}>
                    {message && message}
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <h1 className="text-center my-5" style={{color: "#EC7AB7"}}>Daftar</h1>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="text" placeholder="Nama Lengkap" className="p-3" value={fullname} name="fullname" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="text" placeholder="Username" className="p-3" value={username} name="username" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="text" placeholder="Email" className="p-3" value={email} name="email" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="password" placeholder="Password" className="p-3" value={password} name="password" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Select value={gender} name="gender" onChange={handleChange}>
                                <option hidden>Jenis Kelamin</option>
                                <option value="laki-laki">Laki - Laki</option>
                                <option value="perempuan">Perempuan</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="text" placeholder="Telp" value={phone_number} name="phone_number" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control as="textarea" rows={3} value={address} name="address" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="submit" value="Daftar"className="rounded-pill text-white" style={{background: "linear-gradient(to bottom, #EC7AB7, #EC7A7A)"}}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}