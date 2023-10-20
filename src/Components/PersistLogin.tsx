import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRefreshToken } from '../Hooks/useRefreshToken'
import { useAuth } from '../Hooks/useAuth'
import { AxiosError } from 'axios'

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const refresh = useRefreshToken()
  const { token, persistState } = useAuth()

  useEffect(() => {
    let isMounted = true

    const verifyToken = async () => {
      try {
        await refresh()
      } catch (error: AxiosError | any) {
        console.log(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !token ? verifyToken() : setIsLoading(false)

    return () => {
      isMounted = false
    }
  }, [])

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
