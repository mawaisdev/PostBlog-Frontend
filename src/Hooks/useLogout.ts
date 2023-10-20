import { AxiosError } from 'axios'
import axios from '../Api/axios'
import { AuthState } from '../Types/Context/Auth/AuthState'
import { useAuth } from './useAuth'

export const useLogout = () => {
  const { setAuthState, setPersistState } = useAuth()

  const logout = async () => {
    setAuthState({} as AuthState)
    setPersistState(false)

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
