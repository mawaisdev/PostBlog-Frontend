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
import { Post } from './Components/Post'
import { Routes as RoutesEnum } from './Types/Enums'
import { CommentsProvider } from './Contexts/CommentsContext'

const App = () => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <CommentsProvider>
          <Router>
            <SideNav>
              <Routes>
                <Route path='/' element={<Layout />}>
                  {/* Public Routes */}
                  <Route path={RoutesEnum.Home} element={<PostsPage />} />
                  <Route path={RoutesEnum.Posts} element={<PostsPage />} />
                  <Route path={RoutesEnum.PostWithId} element={<Post />} />

                  <Route path={RoutesEnum.Login} element={<NoAuth />}>
                    <Route index element={<LoginPage />} />
                  </Route>
                  <Route path={RoutesEnum.Signup} element={<NoAuth />}>
                    <Route index element={<SignUpPage />} />
                  </Route>

                  {/* Routes for Authenticated Users (Protected by PersistLogin) */}
                  <Route element={<PersistLogin />}>
                    {/* Routes for Admin */}
                    <Route element={<RequireAuth roles={[Roles.Admin]} />}>
                      <Route
                        path={RoutesEnum.Categories}
                        element={<CategoriesPage />}
                      />
                    </Route>

                    {/* Routes for User */}
                    <Route element={<RequireAuth roles={[Roles.User]} />}>
                      <Route
                        path={RoutesEnum.UserProfile}
                        element={<h1>Profile for User</h1>}
                      />{' '}
                      {/* Renamed to clarify it's for users */}
                    </Route>

                    {/* Routes for Both Admin and User */}
                    <Route
                      element={
                        <RequireAuth roles={[Roles.Admin, Roles.User]} />
                      }
                    >
                      <Route
                        path={RoutesEnum.Dashboard}
                        element={<DashboardPage />}
                      />
                      <Route
                        path={RoutesEnum.Profile}
                        element={<ProfilePage />}
                      />
                      <Route
                        path={RoutesEnum.Settings}
                        element={<SettingsPage />}
                      />
                      <Route
                        path={RoutesEnum.Unauthorized}
                        element={<UnauthorizedPage />}
                      />
                    </Route>
                  </Route>
                </Route>

                {/* Error Routes */}
                <Route path='*' element={<NotFound404 />} />
              </Routes>
            </SideNav>
          </Router>
        </CommentsProvider>
      </CategoryProvider>
    </AuthProvider>
  )
}

export default App
