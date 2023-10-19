import { createContext, useState } from 'react'
import { AuthContextType } from '../Types/Context/Auth/AuthContextType'
import { AuthProviderProps } from '../Types/Context/Auth/AuthProviderProps'
import { AuthState } from '../Types/Context/Auth/AuthState'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
  })

  const [persistState, setPersistState] = useState<boolean>(
    JSON.parse(localStorage.getItem('persistState') || 'false')
  )

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState,
        persistState,
        setPersistState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
