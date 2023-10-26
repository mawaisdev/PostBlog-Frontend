import { User } from '../User'

export interface GetAllPostsResponse {
  status: number
  response: string
  data: Post[]
  totalPostsCount: number
  CurrentPostsCount: number
}

export interface Post {
  id: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
  imageUrl: string
  category: Category
  user: User
}

interface Category {
  id: number
  name: string
}
