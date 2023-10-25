export interface ProfilePageResponse {
  status: number
  message: string
  user: User
}

export interface User {
  firstName: string
  lastName: string
  userName: string
  email: string
  profilePicture: string
  bio: string
  lastLogin: string
  role: string
}
