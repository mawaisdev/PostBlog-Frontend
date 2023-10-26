import { Roles } from '../Responses/User'

export interface RequireAuthProps {
  roles: Array<Roles.Admin | Roles.User>
}
