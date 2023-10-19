import { useLocation, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../Hooks/useAuth'
import { RequireAuthProps } from '../Types/Props/RequireAuthProps'

export const RequireAuth = ({ roles }: RequireAuthProps) => {
  const { token, user } = useAuth()
  const location = useLocation()
  return user && roles.includes(user?.roles) ? (
    <Outlet />
  ) : token && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}
