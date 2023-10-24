import { Category } from '../../Responses/Category/Category'

export interface CategoryContextType {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  categories: Category[]
}
