import React, { useContext, useEffect, useState } from 'react'
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import Login from './modals/Login'
import { UserContext } from '../context/userContext'

// import react-router-dom
import { Link, useNavigate } from 'react-router-dom'

// import image
import UserImage from "../assets/image/UserImage.png"
import Ticket from "../assets/image/ticket.png"
import Bill from "../assets/image/Bill.png"
import Logout from "../assets/image/Logout.png"
import Brand from "../assets/image/Brand.png"
import TambahTiket from "../assets/image/TambahTiket.png"
import Registrasi from './modals/Register'
import { API, setAuthToken } from '../config/api'


function Header() {
	// handle modal
	const [showLogin, setShowLogin] = useState(false)
	const [showRegister, setShowRegister] = useState(false)

	let navigate = useNavigate()

	// UserContext
	const [state, dispatch] = useContext(UserContext)

	const [isLoading, setIsLoading] = useState(true)

	

	const checkUser = async () => {
		try {
			const response = await API.get("/auth")

			// get user data
			let payload = response.data.data.user;
			payload.token = localStorage.token;

			dispatch({
				type:"USER_SUCCESS",
				payload,
			})
			setIsLoading(false)
		} catch (error) {
			console.log("auth failed : ", error);
			dispatch({
				type:"AUTH_ERROR"
			})
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
			checkUser()
		} else {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		// redirect auth
		if(!isLoading) {
			if (state.isLogin === false){
				navigate("/")
			}
		}
	}, [isLoading])


	// handle logout
	const logout = () => {
		dispatch({
			type: "LOGOUT",
		})
	}

  return (
    <>
		<Navbar expand="lg" className="bg-body-tertiary sticky-top">
			<Container>
				<Navbar.Brand>
					<img src={Brand} alt="Brand" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end align-items-center">
                <Nav>
						{/* conitional login navbar */}
						{state.isLogin === true ? (
							state.user.role === "admin" ? (
							<NavDropdown title={state.user.username} id="dropdown">
								<NavDropdown.Item href="#action/3.2">
									<Link to="/admin/tambah-tiket" style={{textDecoration: "none", color: "grey"}}>
										<img src={TambahTiket} alt="TambahTiket" /> Tambah Tiket
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.2">
									<Link to="/admin" style={{textDecoration: "none", color: "grey"}}>
										<img src={TambahTiket} alt="TambahTiket" /> List Transaksi
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4" onClick={logout}>
									<img src={Logout} alt="Logout" /> Logout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<>
								{/* navbar user */}
								<NavDropdown title={state.user.username} id="dropdown">
									<NavDropdown.Item >
										<Link to="/user/tiket-saya" className='text-decoration-none' style={{color: "grey"}}>
											<img src={Ticket} alt="Ticket" /> Tiket Saya
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item >
										<Link to="/user/payment" className='text-decoration-none' style={{color: "grey"}}>
											<img src={Bill} alt="Ticket" /> Payment
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={logout}>
										<img src={Logout} alt="Logout"/>  <Button >Logout</Button>
									</NavDropdown.Item>
								</NavDropdown>
								<img src={UserImage} alt="UserImage" />
							</>
							)
						) : (
							<>
								<Button  className="mx-2" style={{backgroundColor: "white", color:"#EC7AB7", borderColor: "#EC7AB7"}} onClick={() => setShowRegister(true)}>Daftar</Button>
								<Button className="mx-2" style={{backgroundColor: "#EC7AB7", borderColor: "#EC7AB7", color:"white"}} onClick={() => setShowLogin(true)}>Login</Button>
							</>
						)}
                  
                </Nav>
              </Navbar.Collapse>
				  <Login show={showLogin} showLogin={setShowLogin}/>
				  <Registrasi show={showRegister} showLogin={setShowRegister}/>

			</Container>
		</Navbar>
    </>
  )
}

export default Header