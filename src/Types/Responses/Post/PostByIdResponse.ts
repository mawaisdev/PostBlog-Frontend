export interface PostByIdResponse {
  status: number
  response: string
  data?: Data
  commentsPageNumber?: number
  commentsPageSize?: number
  commentsTotalCount?: number
  commentsRemainingCount?: number
}

export interface IPost {
  id: number
  title: string
  body: string
  isDraft: boolean
  isPrivate: boolean
  createdAt: string
  updatedAt: string
  user: User
  category: Category
}

export interface Data extends IPost {
  comments: Comment[]
}

export interface User {
  id: number
  userName: string
  email: string
}

export interface Category {
  id: number
  name: string
}

export interface Comment {
  comment_id: number
  comment_text: string
  userId: number
  childCount: string
  hasChild: boolean
}
