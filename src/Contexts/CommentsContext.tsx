import { createContext, useContext, useState } from 'react'
import { Comment } from '../Types/Responses/Post/PostByIdResponse'

type CommentsState = Record<string, Comment[]>

interface CommentsContextType {
  comments: CommentsState
  setChildComments: (parentId: number | null, comments: Comment[]) => void
  removeComment: (parentId: number | null, commentId: number) => void
}

export const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
)

export const CommentsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [comments, setComments] = useState<CommentsState>({})

  const setChildComments = (
    parentId: number | null,
    childComments: Comment[]
  ) => {
    setComments((prevComments) => ({
      ...prevComments,
      [String(parentId)]: childComments,
    }))
  }

  const removeComment = (parentId: number | null, commentId: number) => {
    setComments((prevComments) => {
      const updatedCommentsState = { ...prevComments }

      if (parentId === null) {
        // Main comment
        // Remove the standalone main comment
        if (updatedCommentsState['null']) {
          updatedCommentsState['null'] = updatedCommentsState['null'].filter(
            (comment) => comment.comment_id !== commentId
          )

          // If after deletion, there are no main comments, remove the "null" key
          if (updatedCommentsState['null'].length === 0) {
            delete updatedCommentsState['null']
          }
        }
      } else {
        // Child comment
        // Remove the child comment
        if (updatedCommentsState[String(parentId)]) {
          updatedCommentsState[String(parentId)] = updatedCommentsState[
            String(parentId)
          ].filter((comment) => comment.comment_id !== commentId)

          // If after deletion, the parent has no more children, remove the key
          if (updatedCommentsState[String(parentId)].length === 0) {
            delete updatedCommentsState[String(parentId)]
          }
        }

        // If this child comment is also a parent to others, remove its key
        if (updatedCommentsState[String(commentId)]) {
          delete updatedCommentsState[String(commentId)]
        }
      }

      return updatedCommentsState
    })
  }

  return (
    <CommentsContext.Provider
      value={{ comments, setChildComments, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

export function useComments() {
  const context = useContext(CommentsContext)
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider')
  }
  return context
}
