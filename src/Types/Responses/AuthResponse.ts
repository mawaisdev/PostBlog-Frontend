import { User } from './User'

export interface AuthResponse {
  status: number
  errors: string[]
  token: string
  userData: User
}
