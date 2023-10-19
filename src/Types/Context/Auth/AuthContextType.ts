import { AuthState } from './AuthState'

export interface AuthContextType extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  persistState: boolean
  setPersistState: React.Dispatch<React.SetStateAction<boolean>>
}
