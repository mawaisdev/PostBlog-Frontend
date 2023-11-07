export interface PostByIdResponse {
  status: number
  response: string
  data?: Post
  pageNumber?: number
  pageSize?: number
  totalCommentsCount?: number
  remainingCommentsCount?: number
}

export interface Post {
  id: number
  title: string
  body: string
  isDraft: boolean
  isPrivate: boolean
  createdAt: string
  updatedAt: string
  imageUrl: string
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

export interface PaginatedComments {
  data: Comment[]
  totalCommentsCount: number
  remainingCommentsCount: number
  pageNumber: number
  pageSize: number
}
export interface GetChildCommentsResponse extends PaginatedComments {
  status: number
  response: string
}
