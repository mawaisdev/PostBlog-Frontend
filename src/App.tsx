import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import NotFound404 from './Pages/Missing'
import { RequireAuth, RequireNoAuth } from './Components/RequireAuth'
import Layout from './Routes/Layout'
import { Dashboard } from './Pages/DashboardPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes Here*/}
        <Route path='/' element={<Home />} />
        <Route element={<RequireNoAuth />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Route>

        {/* Private Routes Here*/}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Errors Routes Here*/}
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>
  )
}

export default App
