import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
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
import { PostsPage } from './Pages/PostsPage'
import { Roles } from './Types/Responses/User'
import { SideNav } from './Components/SideNav'
import { AuthProvider } from './Contexts/AuthContext'
import { CategoryProvider } from './Contexts/CategoryContext'

const App = () => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Router>
          <SideNav>
            <Routes>
              <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route path='/' element={<PostsPage />} />
                <Route path='/login' element={<NoAuth />}>
                  <Route index element={<LoginPage />} />
                </Route>
                <Route path='/signup' element={<NoAuth />}>
                  <Route index element={<SignUpPage />} />
                </Route>

                {/* Routes for Authenticated Users (Protected by PersistLogin) */}
                <Route element={<PersistLogin />}>
                  {/* Routes for Admin */}
                  <Route element={<RequireAuth roles={[Roles.Admin]} />}>
                    <Route path='/category' element={<CategoriesPage />} />
                  </Route>

                  {/* Routes for User */}
                  <Route element={<RequireAuth roles={[Roles.User]} />}>
                    <Route
                      path='/userprofile'
                      element={<h1>Profile for User</h1>}
                    />{' '}
                    {/* Renamed to clarify it's for users */}
                  </Route>

                  {/* Routes for Both Admin and User */}
                  <Route
                    element={<RequireAuth roles={[Roles.Admin, Roles.User]} />}
                  >
                    <Route path='/dashboard' element={<DashboardPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route
                      path='/unauthorized'
                      element={<UnauthorizedPage />}
                    />
                    <Route path='/posts/:id' element={<h1>Post Page</h1>} />
                  </Route>
                </Route>
              </Route>

              {/* Error Routes */}
              <Route path='*' element={<NotFound404 />} />
            </Routes>
          </SideNav>
        </Router>
      </CategoryProvider>
    </AuthProvider>
  )
}

export default App
