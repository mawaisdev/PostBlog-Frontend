import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRefreshToken } from '../Hooks/useRefreshToken'
import { useAuth } from '../Hooks/useAuth'
import { AxiosError } from 'axios'
import jwtDecode from 'jwt-decode'
import { User } from '../Types/Responses/User'

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const refresh = useRefreshToken()
  const { token, setPersistState, persistState, setAuthState } = useAuth()

  useEffect(() => {
    let isMounted = true

    const verifyToken = async () => {
      try {
        await refresh()
      } catch (error: AxiosError | any) {
        // If refreshing the token fails, remove persistence
        localStorage.removeItem('authToken')
        localStorage.removeItem('persistState')
        setPersistState(false)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    if (!token) {
      // Check if the token is in local storage
      const localStorageToken = localStorage.getItem('authToken')
      if (localStorageToken) {
        // If token is found in local storage, set it in the state.
        // Also, set persistState to true
        setAuthState({
          token: localStorageToken,
          user: jwtDecode<User>(localStorageToken),
        }) // You might want to fetch the user's details here or set them from local storage if saved
        // auth state modified
        setPersistState(true)
        setIsLoading(false)
      } else {
        verifyToken()
      }
    } else {
      setIsLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [])

  // return <>{isLoading ? <div>Loading.....</div> : <Outlet />}</>
  return (
    <>
      {!persistState ? (
        <Outlet />
      ) : isLoading ? (
        <div>Loading.....</div>
      ) : (
        <Outlet />
      )}
    </>
  )
}
