export interface User {
  email: string
  userName: string
  id: number
  roles: Roles.Admin | Roles.User
}

export enum Roles {
  Admin = 'Admin',
  User = 'User',
}
