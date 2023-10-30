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
    console.log('removeComment', { parentId, commentId })

    if (parentId !== null) {
      console.log('Not handling non-main comments right now.')
      return // exit early if parentId is not null
    }

    setComments((prevComments) => {
      console.log('Comments State Before Anything', { prevComments })
      const updatedCommentsState = { ...prevComments }

      // Remove the standalone main comment
      if (updatedCommentsState['null']) {
        updatedCommentsState['null'] = updatedCommentsState['null'].filter(
          (comment) => comment.comment_id !== commentId
        )

        // If after deletion, there are no main comments, remove the "null" key
        if (updatedCommentsState['null'].length === 0) {
          delete updatedCommentsState['null']
        }

        console.log('Comments State After Deleting', {
          updatedCommentsState,
        })
      }

      console.log('Comments State Final', { updatedCommentsState })
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
