import { PrivateProps } from '../PropTypes/PrivateProps'
import { Login } from './Login'

export const Private = ({ isLoggedIn, component: Component }: PrivateProps) => {
  if (isLoggedIn) return <Component name='Awais' />
  else return <Login />
}
