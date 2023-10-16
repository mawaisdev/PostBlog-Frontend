import { createContext } from 'react'
import { theme } from './Theme'
import { ThemeContextProviderProps } from '../PropTypes/ThemeContextProviderProps'

export const ThemeContext = createContext(theme)

export const ThenmeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
