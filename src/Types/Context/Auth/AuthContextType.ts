import { AuthState } from './AuthState'

export interface AuthContextType extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}
