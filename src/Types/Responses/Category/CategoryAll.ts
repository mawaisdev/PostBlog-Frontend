import { Category } from './Category'

export interface CategoryAllResponse {
  status: number
  response: string
  data: Category[]
}
