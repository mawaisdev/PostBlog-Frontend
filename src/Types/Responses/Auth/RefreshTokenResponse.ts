export interface RefreshTokenResponse {
  status: number
  errors: string[]
  token: string
  roles: 'Admin' | 'User'
}
