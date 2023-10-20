import axios from '../Api/axios'
import { RefreshTokenResponse } from '../Types/Responses/Auth/RefreshTokenResponse'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
  const { setAuthState } = useAuth()

  const refresh = async () => {
    const { data } = await axios.get<RefreshTokenResponse>(
      '/auth/refresh-token',
      {
        withCredentials: true,
      }
    )

    setAuthState((prevState) => {
      return {
        ...prevState,
        user: data.userData,
        token: data.token,
      }
    })
    return data.token
  }
  return refresh
}
