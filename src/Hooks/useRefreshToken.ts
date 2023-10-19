import axios from '../Api/axios'
import { RefreshTokenResponse } from '../Types/Responses/Auth/RefreshTokenResponse'
import { User } from '../Types/Responses/User'
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
      const user: User = {
        email: prevState.user?.email || '',
        userName: prevState.user?.userName || '',
        id: prevState.user?.id || 0,
        roles: data.roles,
      }
      return { ...prevState, user: user, token: data.token }
    })
    return data.token
  }
  return refresh
}
