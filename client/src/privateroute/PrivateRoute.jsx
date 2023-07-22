import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const [state, dispatch] = useContext(UserContext)
  return (
    state.isLogin ? <Outlet /> : <Navigate to="/"/>
  )
}

export default PrivateRoute