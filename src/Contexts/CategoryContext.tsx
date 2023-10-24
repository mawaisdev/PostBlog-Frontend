import { createContext, useContext, useState, FC } from 'react'
import { Category } from '../Types/Responses/Category/Category'
import { CategoryContextType } from '../Types/Context/Category/CategoryContextType'
import { CategoryProviderProps } from '../Types/Context/Category/CategoryProviderProps'

// Create the context
const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
)

// Create the provider component
export const CategoryProvider: FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

// Custom hook to use the category context
export const useCategories = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider')
  }
  return context
}
