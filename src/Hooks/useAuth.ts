import { useContext } from 'react'
import { AuthContextType } from '../Types/Context/Auth/AuthContextType'
import { AuthContext } from '../Contexts/AuthContext'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
