// import { createContext, useContext, useState } from 'react'
// import { Comment } from '../Types/Responses/Post/PostByIdResponse'

// type CommentsState = Record<string, Comment[]>

// interface CommentsContextType {
//   comments: CommentsState
//   setChildComments: (parentId: number | null, comments: Comment[]) => void
//   removeComment: (parentId: number | null, commentId: number) => void
//   addComment: (parentId: number | null, comment: Comment) => void
// }

// export const CommentsContext = createContext<CommentsContextType | undefined>(
//   undefined
// )

// export const CommentsProvider = ({
//   children,
// }: {
//   children: React.ReactNode
// }) => {
//   const [comments, setComments] = useState<CommentsState>({})

//   const setChildComments = (
//     parentId: number | null,
//     childComments: Comment[]
//   ) => {
//     setComments((prevComments) => ({
//       ...prevComments,
//       [String(parentId)]: childComments,
//     }))
//   }

//   const removeComment = (parentId: number | null, commentId: number) => {
//     setComments((prevComments) => {
//       const updatedCommentsState = { ...prevComments }

//       if (parentId === null) {
//         // Main comment
//         // Remove the standalone main comment
//         if (updatedCommentsState['null']) {
//           updatedCommentsState['null'] = updatedCommentsState['null'].filter(
//             (comment) => comment.comment_id !== commentId
//           )

//           // If after deletion, there are no main comments, remove the "null" key
//           if (updatedCommentsState['null'].length === 0) {
//             delete updatedCommentsState['null']
//           }
//         }
//       } else {
//         // Child comment
//         // Remove the child comment
//         if (updatedCommentsState[String(parentId)]) {
//           updatedCommentsState[String(parentId)] = updatedCommentsState[
//             String(parentId)
//           ].filter((comment) => comment.comment_id !== commentId)

//           // If after deletion, the parent has no more children, remove the key
//           if (updatedCommentsState[String(parentId)].length === 0) {
//             delete updatedCommentsState[String(parentId)]
//           }
//         }

//         // If this child comment is also a parent to others, remove its key
//         if (updatedCommentsState[String(commentId)]) {
//           delete updatedCommentsState[String(commentId)]
//         }
//       }

//       return updatedCommentsState
//     })
//   }

//   const addComment = (parentId: number | null, comment: Comment) => {
//     setComments((prevComments) => {
//       const updatedComments = { ...prevComments }
//       const key = parentId === null ? 'null' : String(parentId)

//       if (!updatedComments[key]) updatedComments[key] = []
//       updatedComments[key].push(comment)

//       return updatedComments
//     })
//   }

//   return (
//     <CommentsContext.Provider
//       value={{ comments, setChildComments, removeComment, addComment }}
//     >
//       {children}
//     </CommentsContext.Provider>
//   )
// }

// export function useComments() {
//   const context = useContext(CommentsContext)
//   if (!context) {
//     throw new Error('useComments must be used within a CommentsProvider')
//   }
//   return context
// }

// New Comments Context
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

  // const setChildComments = (
  //   parentId: number | null,
  //   paginatedComments: PaginatedComments
  // ) => {
  //   setComments((prevComments) => {
  //     const existingPaginatedComments = prevComments[String(parentId)]

  //     if (existingPaginatedComments) {
  //       // Append new comments to the existing array
  //       existingPaginatedComments.data = existingPaginatedComments.data.concat(
  //         paginatedComments.data
  //       )

  //       // Update page number and page size
  //       existingPaginatedComments.pageNumber = paginatedComments.pageNumber
  //       existingPaginatedComments.pageSize = paginatedComments.pageNumber
  //     } else {
  //       // Create a new PaginatedComments object
  //       const newPaginatedComments: PaginatedComments = {
  //         ...paginatedComments,
  //       }

  //       prevComments[String(parentId)] = newPaginatedComments
  //     }

  //     return { ...prevComments }
  //   })
  //   console.log('State of comments', { comments })
  // }

  // New setChildComments
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

  return (
    <CommentsContext.Provider
      value={{ comments, setChildComments, removeComment, addComment }}
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
