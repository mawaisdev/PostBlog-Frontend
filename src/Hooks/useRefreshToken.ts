import axios from '../Api/axios'
import { RefreshTokenResponse } from '../Types/Responses/Auth/RefreshTokenResponse'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
  const { setAuthState, token } = useAuth()
  const refresh = async () => {
    const { data } = await axios.get<RefreshTokenResponse>(
      '/auth/refresh-token',
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming the token type is Bearer
        },
        withCredentials: true,
      }
    )

    setAuthState((prevState) => {
      return { ...prevState, token: data.token }
    })
    return data.token
  }
  return refresh
}
