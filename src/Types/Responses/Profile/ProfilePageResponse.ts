export interface ProfilePageResponse {
  status: number
  message: string
  user: ProfileUser
}

export interface ProfileUser {
  firstName: string
  lastName: string | null
  userName: string
  email: string
  profilePicture: string | null
  bio: string | null
  lastLogin: string
  role: string
}
