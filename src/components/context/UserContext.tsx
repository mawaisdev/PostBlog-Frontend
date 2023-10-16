import { createContext, useState } from 'react'
import { AuthUser } from '../PropTypes/AuthUserProps'
import {
  UserContextProviderProps,
  UserContextType,
} from '../PropTypes/UserContextProviderProps'

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
