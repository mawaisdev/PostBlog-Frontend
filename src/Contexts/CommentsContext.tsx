import { createContext, useContext, useState } from 'react'
import {
  Comment,
  PaginatedComments,
} from '../Types/Responses/Post/PostByIdResponse'

type CommentsState = Record<string, PaginatedComments>

interface CommentsContextType {
  comments: CommentsState
  setChildComments: (
    parentId: number | null,
    paginatedComments: PaginatedComments
  ) => void
  removeComment: (parentId: number | null, commentId: number) => void
  addComment: (parentId: number | null, comment: Comment) => void
  resetComments: () => void
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
    paginatedComments: PaginatedComments
  ) => {
    setComments((prevComments) => {
      const existingPaginatedComments = prevComments[String(parentId)]

      if (existingPaginatedComments) {
        // Append new comments to the existing array
        existingPaginatedComments.data = existingPaginatedComments.data.concat(
          paginatedComments.data
        )

        // Update page number and page size
        existingPaginatedComments.pageNumber = paginatedComments.pageNumber
        existingPaginatedComments.pageSize = paginatedComments.pageSize
      } else {
        // Create a new PaginatedComments object
        const newPaginatedComments: PaginatedComments = {
          ...paginatedComments,
        }

        prevComments[String(parentId)] = newPaginatedComments
      }

      return { ...prevComments }
    })
    console.log('State of comments', { comments })
  }

  const removeComment = (parentId: number | null, commentId: number) => {
    setComments((prevComments) => {
      const updatedCommentsState = { ...prevComments }

      if (parentId !== null) {
        // Handle removal of the child comment and update pagination if needed
        const paginatedComments = updatedCommentsState[String(parentId)]
        if (paginatedComments) {
          const updatedData = paginatedComments.data.filter(
            (comment) => comment.comment_id !== commentId
          )

          paginatedComments.data = updatedData
          paginatedComments.totalCommentsCount = updatedData.length
          paginatedComments.remainingCommentsCount = 0 // You might need to update this based on your logic

          return updatedCommentsState
        }
      } else {
        // Handle removal of the main comment
        if (updatedCommentsState['null']) {
          const updatedData = updatedCommentsState['null'].data.filter(
            (comment) => comment.comment_id !== commentId
          )

          updatedCommentsState['null'].data = updatedData
          updatedCommentsState['null'].totalCommentsCount = updatedData.length
          updatedCommentsState['null'].remainingCommentsCount = 0 // You might need to update this based on your logic

          return updatedCommentsState
        }
      }

      return updatedCommentsState
    })
  }

  const addComment = (parentId: number | null, comment: Comment) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments }
      const key = parentId === null ? 'null' : String(parentId)
      const paginatedComments = updatedComments[key]

      if (paginatedComments) {
        // Append the new comment to the existing data
        paginatedComments.data = paginatedComments.data.concat(comment)
        paginatedComments.totalCommentsCount += 1 // Update the total comments count
        paginatedComments.remainingCommentsCount += 1 // Update the remaining comments count
      } else {
        // Create a new PaginatedComments object
        const newPaginatedComments: PaginatedComments = {
          data: [comment],
          totalCommentsCount: 1,
          remainingCommentsCount: 1,
          pageNumber: 1, // You might need to update this based on your logic
          pageSize: 1, // You might need to update this based on your logic
        }

        updatedComments[key] = newPaginatedComments
      }

      return updatedComments
    })
  }

  const resetComments = (): void => {
    console.log('Resetting comments')

    setComments((_) => ({})) // Reset the comments state to an empty object
    console.log('Comments State: ', comments)
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setChildComments,
        removeComment,
        addComment,
        resetComments,
      }}
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
