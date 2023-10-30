export interface PostByIdResponse {
  status: number
  response: string
  data?: Post
}

export interface Post {
  id: number
  title: string
  body: string
  isDraft: boolean
  isPrivate: boolean
  createdAt: string
  updatedAt: string
  user: User
  category: Category
  comments: Comment[]
}

interface User {
  id: number
  userName: string
  email: string
}

interface Category {
  id: number
  name: string
}

export interface Comment {
  comment_id: number
  comment_text: string
  childCount: string
  userId: number
  hasChild: boolean
}
