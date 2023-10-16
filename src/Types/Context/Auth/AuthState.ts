import { User } from '../../Responses/User'

export interface AuthState {
  token: string | null
  user: User | null
}
