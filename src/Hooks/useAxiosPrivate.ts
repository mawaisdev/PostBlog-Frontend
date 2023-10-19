import { axiosPrivate } from '../Api/axios'
import { useEffect } from 'react'
import { useRefreshToken } from './useRefreshToken'
import { useAuth } from './useAuth'
export const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { token } = useAuth()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true
          const newToken = await refresh()
          previousRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axiosPrivate(previousRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [token, refresh])

  return axiosPrivate
}
