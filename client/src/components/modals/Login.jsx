import React, { useContext, useState } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../config/api';

function Login(props) {
	let navigate = useNavigate()

	// UserContext
	const [_, dispatch] = useContext(UserContext)
	
	// handle login
	const [form, setForm] = useState({
		username: '',
		password: '',
	})

	// handle message
	const [message, setMessage] = useState(null)
	

	const {username, password} = form

	const handleChange = (e) => {
		setForm({
		  ...form,
		  [e.target.name]: e.target.value,
		});
	 };

	 const handleSubmit = useMutation(async (e) => {
		try{
			e.preventDefault()

			// insert data for login
			const response = await API.post("/login", form);

			// send data to useContext
			dispatch({
				type: "LOGIN_SUCCESS",
				payload: response.data.data.user,
			})

			setAuthToken(localStorage.token)

			// status check
			if (response.data.data.user.role === "admin") {
				navigate("/admin")
				alert("admin :login success")
			} else {
				navigate("/user")
				alert("user :login success")
			}

			props.showLogin()
		} catch (error){
			const alert = (
				<Alert variant='danger' className='py-1'>
					Login failed
				</Alert>
			)
			setMessage(alert)
			console.log("login failed :", error);
		}
	 })


  return (
    <div>
        <Modal show={props.show} onHide={props.showLogin}  aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Body>
				{message && message}
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <h1 className="text-center my-5" style={{color: "#EC7AB7"}}>Login</h1>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="text" placeholder="Username" className="p-3" name="username" id="username" value={username} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-5">
                            <Form.Control type="password" placeholder="Password" className="p-3" name="password" id="password" value={password} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="my-5 mx-5">
                            <Form.Control type="submit" className="rounded-pill text-white" value="Login" style={{background: "linear-gradient(to bottom, #EC7AB7, #EC7A7A)"}} />
                        </Form.Group>
                    </Form>
                <p className="text-center">Belum punya akun ? <Button style={{backgroundColor: "Transparent", border: "none", color:"blue"}}>klik disini</Button> </p>
            </Modal.Body>
      </Modal>
    </div>
  )
}

export default Login