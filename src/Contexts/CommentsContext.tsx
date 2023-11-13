import React, { createContext, useContext, useState } from 'react'
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
  setComments: React.Dispatch<React.SetStateAction<CommentsState>>
  showLess: (parentId: string) => void
  editComment: (
    parentId: number | null,
    commentId: number,
    newText: string
  ) => void
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
        if (paginatedComments.data.length === 0) {
          paginatedComments.totalCommentsCount = 1
        } else {
          paginatedComments.totalCommentsCount += 1
        }
        paginatedComments.data.unshift(comment)
        if (paginatedComments.data.length > paginatedComments.pageSize) {
          paginatedComments.data.pop() // Remove the last comment from the array if the
          paginatedComments.remainingCommentsCount += 1 // Update the remaining comments count
        }
      } else {
        // Create a new PaginatedComments object
        const newPaginatedComments: PaginatedComments = {
          data: [comment],
          totalCommentsCount: 1,
          remainingCommentsCount: 0,
          pageNumber: 1, // You might need to update this based on your logic
          pageSize: 5, // You might need to update this based on your logic
        }

        updatedComments[key] = newPaginatedComments
      }

      return updatedComments
    })
  }

  const showLess = (parentId: string) => {
    setComments((prevComments) => {
      const updatedCommentsState = { ...prevComments }

      if (updatedCommentsState[parentId]) {
        const paginatedComments = updatedCommentsState[parentId]

        if (paginatedComments.data.length > 5) {
          // Trim the data array to keep only the latest 5 elements
          paginatedComments.data = paginatedComments.data.slice(0, 5)

          // Reset the page number to 1
          paginatedComments.pageNumber = 1

          // Reset the remaining comments count based on the total comment count
          paginatedComments.remainingCommentsCount =
            paginatedComments.totalCommentsCount - 5
        }
      }

      return updatedCommentsState
    })
  }
  const editComment = (
    parentId: number | null,
    commentId: number,
    newText: string
  ) => {
    setComments((prevComments) => {
      const updatedCommentsState = { ...prevComments }

      if (parentId !== null) {
        // Handle editing of the child comment
        const paginatedComments = updatedCommentsState[String(parentId)]
        if (paginatedComments) {
          const updatedData = paginatedComments.data.map((comment) =>
            comment.comment_id === commentId
              ? { ...comment, comment_text: newText }
              : comment
          )

          paginatedComments.data = updatedData

          return updatedCommentsState
        }
      } else {
        // Handle editing of the main comment
        if (updatedCommentsState['null']) {
          const updatedData = updatedCommentsState['null'].data.map((comment) =>
            comment.comment_id === commentId
              ? { ...comment, comment_text: newText }
              : comment
          )

          updatedCommentsState['null'].data = updatedData

          return updatedCommentsState
        }
      }

      return updatedCommentsState
    })
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setChildComments,
        removeComment,
        addComment,
        editComment,
        setComments,
        showLess,
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
