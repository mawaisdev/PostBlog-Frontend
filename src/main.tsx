import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Contexts/AuthContext.tsx'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'
// import Navbar from './Components/Navbar.tsx'
import { SideNav } from './Components/SideNav.tsx'
import { Box } from '@mui/material'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SideNav>
          <Routes>
            <Route
              path='/*'
              element={
                <Box height={100}>
                  <App />
                </Box>
              }
            />
          </Routes>
        </SideNav>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
