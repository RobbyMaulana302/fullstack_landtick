import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext.jsx'
// import './index.css'

// import browser router
import { BrowserRouter as Router } from 'react-router-dom'

// import react query client
import {QueryClient, QueryClientProvider} from "react-query"

const client = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
