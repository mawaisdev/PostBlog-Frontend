import { AxiosError } from 'axios'
import axios from '../Api/axios'
import { AuthState } from '../Types/Context/Auth/AuthState'
import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const { setAuthState, setPersistState } = useAuth()
  const navigate = useNavigate() // <-- useNavigate hook

  const logout = async () => {
    // Clear state
    setAuthState({} as AuthState)

    // Clear local storage
    localStorage.removeItem('authToken')
    localStorage.removeItem('persistState')
    // Update the context
    setPersistState(false)

    // Make the API call to log out
    try {
      const {} = await axios.get('/auth/logout', {
        withCredentials: true,
      })
    } catch (error: AxiosError | any) {
      console.log(error)
    }
    navigate('/login') // <-- Navigate to login page after successful logout
  }

  return logout
}
