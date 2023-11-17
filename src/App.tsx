import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { NotFound404 } from './Pages/NotFound404Page'
import { NoAuth, RequireAuth } from './Components/ControllAuthRoutes'
import { Layout } from './Routes/Layout'
import { PersistLogin } from './Components/PersistLogin'
import { Roles } from './Types/Responses/User'
import { SideNav } from './Components/SideNav'
import { AuthProvider } from './Contexts/AuthContext'
import { Post } from './Components/Post'
import { Routes as RoutesEnum } from './Types/Enums'
import { CommentsProvider } from './Contexts/CommentsContext'
import { CreatePost } from './Components/CreatePost'
import { UpdatePost } from './Components/UpdatePost'
import { lazy, Suspense } from 'react'
import { ResponsiveCircularProgress } from './Components/ResponsiveCircularProgress'

const PostsPage = lazy(() => import('./Pages/PostsPage'))
const CategoriesPage = lazy(() => import('./Pages/CategoriesPage'))
const DashboardPage = lazy(() => import('./Pages/DashboardPage'))
const UnauthorizedPage = lazy(() => import('./Pages/UnauthorizedPage'))
const LoginPage = lazy(() => import('./Pages/LoginPage'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage'))
const SignUpPage = lazy(() => import('./Pages/SignUpPage'))
const SettingsPage = lazy(() => import('./Pages/SettingsPage'))
const MyPostsPage = lazy(() => import('./Pages/MyPosts'))

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <SideNav>
          <Suspense fallback={<ResponsiveCircularProgress />}>
            <Routes>
              <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route path={RoutesEnum.Home} element={<PostsPage />} />
                <Route path={RoutesEnum.Posts} element={<PostsPage />} />
                <Route
                  path={RoutesEnum.PostWithId}
                  element={
                    <CommentsProvider>
                      <Post />
                    </CommentsProvider>
                  }
                />
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
                    element={<RequireAuth roles={[Roles.Admin, Roles.User]} />}
                  >
                    <Route
                      path={RoutesEnum.Dashboard}
                      element={<DashboardPage />}
                    />
                    <Route
                      path={RoutesEnum.CreatePost}
                      element={<CreatePost />}
                    />
                    <Route
                      path={RoutesEnum.MyPosts}
                      element={<MyPostsPage />}
                    />
                    <Route
                      path={RoutesEnum.UpdatePost}
                      element={<UpdatePost />}
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
          </Suspense>
        </SideNav>
      </Router>
    </AuthProvider>
  )
}

export default App
