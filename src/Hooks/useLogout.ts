import { AxiosError } from 'axios'
import axios from '../Api/axios'
import { AuthState } from '../Types/Context/Auth/AuthState'
import { useAuth } from './useAuth'

export const useLogout = () => {
  const { setAuthState } = useAuth()

  const logout = async () => {
    setAuthState({} as AuthState)

    try {
      const {} = await axios.get('/auth/logout', {
        withCredentials: true,
      })
    } catch (error: AxiosError | any) {
      console.log(error)
    }
  }

  return logout
}
