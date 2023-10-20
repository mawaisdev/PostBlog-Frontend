import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import NotFound404 from './Pages/Missing'
import { RequireAuth } from './Components/ControllAuthRoutes'
import Layout from './Routes/Layout'
import { Dashboard } from './Pages/DashboardPage'
import { UnauthorizedPage } from './Pages/UnauthorizedPage'
import { Categories } from './Components/Categories'
import { PersistLogin } from './Components/PersistLogin'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes Here*/}
        <Route path='/' element={<Home />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />

        {/* Private Routes for Admin Here*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth roles={['Admin']} />}>
            <Route path='/category' element={<Categories />} />
          </Route>

          {/* Private Routes for User Here*/}
          <Route element={<RequireAuth roles={['User']} />}>
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>

          {/* Private Routes for Both Admin and User Here*/}
          <Route element={<RequireAuth roles={['User', 'Admin']} />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Route>

      {/* Errors Routes Here*/}
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

export default App
