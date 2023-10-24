import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { NotFound404 } from './Pages/NotFound404Page'
import { NoAuth, RequireAuth } from './Components/ControllAuthRoutes'
import { Layout } from './Routes/Layout'
import { DashboardPage } from './Pages/DashboardPage'
import { UnauthorizedPage } from './Pages/UnauthorizedPage'
import { PersistLogin } from './Components/PersistLogin'
import { ProfilePage } from './Pages/ProfilePage'
import { SettingsPage } from './Pages/SettingsPage'
import { LoginPage } from './Pages/LoginPage'
import { SignUpPage } from './Pages/SignUpPage'
import { CategoriesPage } from './Pages/CategoriesPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<NoAuth />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path='/signup' element={<NoAuth />}>
          <Route index element={<SignUpPage />} />
        </Route>

        {/* Routes for Authenticated Users (Protected by PersistLogin) */}
        <Route element={<PersistLogin />}>
          {/* Routes for Admin */}
          <Route element={<RequireAuth roles={['Admin']} />}>
            <Route path='/category' element={<CategoriesPage />} />
          </Route>

          {/* Routes for User */}
          <Route element={<RequireAuth roles={['User']} />}>
            <Route path='/userprofile' element={<h1>Profile for User</h1>} />{' '}
            {/* Renamed to clarify it's for users */}
          </Route>

          {/* Routes for Both Admin and User */}
          <Route element={<RequireAuth roles={['User', 'Admin']} />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/unauthorized' element={<UnauthorizedPage />} />
          </Route>
        </Route>
      </Route>

      {/* Error Routes */}
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

export default App
