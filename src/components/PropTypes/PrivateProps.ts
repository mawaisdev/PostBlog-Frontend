import { ProfileProps } from './ProfileProps'

export interface PrivateProps {
  isLoggedIn: boolean
  component: React.ComponentType<ProfileProps>
}
