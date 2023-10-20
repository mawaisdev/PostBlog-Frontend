import { User } from '../User'

export interface RefreshTokenResponse {
  status: number
  errors: string[]
  token: string
  userData: User
}
