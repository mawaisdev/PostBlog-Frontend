import { useLocation, Navigate, Outlet } from 'react-router-dom'

import { RequireAuthProps } from '../Types/Props/RequireAuthProps'
import { User } from '../Types/Responses/User'
import jwtDecode from 'jwt-decode'
import { useAuth } from '../Hooks/useAuth'

export const RequireAuth = ({ roles }: RequireAuthProps) => {
  const { token } = useAuth()
  const location = useLocation()
  const user = token && jwtDecode<User>(token)

  return token && user && roles.includes(user.roles) ? (
    <Outlet />
  ) : token && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export const NoAuth: React.FC = () => {
  const token = localStorage.getItem('authToken')

  // If the user is authenticated, redirect them to the dashboard
  if (token) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />
  }

  // If not authenticated, render the children (like login or signup form)
  return <Outlet />
}
