import { AuthUser } from './AuthUserProps'

export interface UserContextProviderProps {
  children: React.ReactNode
}

export interface UserContextType {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}
