import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Header from './components/Header'

// import boostrap
import "bootstrap/dist/css/bootstrap.min.css"
import {  Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'

// import user pages
import UserHomePage from './pages/user/UserHomePage'
import UserTiketSaya from './pages/user/UserTiketSaya'
import UserPayment from './pages/user/UserPayment'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminTambahTiket from './pages/admin/AdminTambahTiket'
import PrivateRoute from './privateroute/PrivateRoute'
import { UserContext } from './context/userContext'
import { API, setAuthToken } from './config/api'


function App() {

  return (
    <>
      {/* import header / navbar */}
      <Header />

        {/* router */}
        <Routes>
          <Route path='/' element={<HomePage />}></Route>

          {/* private route */}
          <Route path='/' element={<PrivateRoute />}>
            {/* user router */}
            <Route path='/user' element={<UserHomePage />}></Route>
            <Route path='/user/tiket-saya' element={<UserTiketSaya />}></Route>
            <Route path='/user/payment/:id' element={<UserPayment />}></Route>

            {/* admin router */}
            <Route path='/admin' element={<AdminHomePage />}></Route>
            <Route path='/admin/tambah-tiket' element={<AdminTambahTiket />}></Route>
          </Route>
        </Routes>

      {/* import footer error*/}
      {/* <Footer /> */}
    </>
  )
}

export default App
