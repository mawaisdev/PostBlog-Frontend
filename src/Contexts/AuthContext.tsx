import { FC, createContext, useState, useEffect } from 'react'
import { AuthContextType } from '../Types/Context/Auth/AuthContextType'
import { AuthProviderProps } from '../Types/Context/Auth/AuthProviderProps'
import { AuthState } from '../Types/Context/Auth/AuthState'
import jwtDecode from 'jwt-decode'
import { User } from '../Types/Responses/User'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
const LOGOUT_DURATION = import.meta.env.VITE_LOGOUT_DURATION

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const localStorageToken = localStorage.getItem('authToken')

  const initialAuthState: AuthState = {
    token: localStorage.getItem('authToken'),
    user: localStorageToken ? jwtDecode<User>(localStorageToken) : null,
  }

  const [authState, setAuthState] = useState<AuthState>(initialAuthState)

  const [persistState, setPersistState] = useState<boolean>(
    JSON.parse(localStorage.getItem('persistState') || 'false')
  )

  // Set token and user to local storage if persistState is true
  useEffect(() => {
    if (persistState) {
      localStorage.setItem('authToken', authState.token || '')
      // If you store user in local storage, add it here as well
    }
  }, [authState, persistState])

  // Auto-Logout logic after a specific duration if persistState is not set
  useEffect(() => {
    let logoutTimer: NodeJS.Timeout

    if (!persistState && authState.token) {
      logoutTimer = setTimeout(() => {
        setAuthState({ token: null, user: null })
        // Remove the token and persistState from local storage
        localStorage.removeItem('authToken')
        localStorage.removeItem('persistState')
      }, LOGOUT_DURATION)
    }

    return () => {
      clearTimeout(logoutTimer)
    }
  }, [authState, persistState])

  return (
    <AuthContext.Provider
      value={{ ...authState, setAuthState, persistState, setPersistState }}
    >
      {children}
    </AuthContext.Provider>
  )
}
