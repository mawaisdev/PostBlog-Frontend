import { memo, useEffect, useState } from 'react'
import { Comment } from '../Types/Responses/Post/PostByIdResponse'
import { Button, Card, CardContent, Container, Typography } from '@mui/material'

export interface ICommentsSectionProps {
  comments: Comment[]
  commentsPageNumber?: number
  commentsPageSize?: number
  commentsTotalCount?: number
  commentsRemainingCount?: number
}

export const CommentsSection = memo(
  ({ comments, commentsRemainingCount }: ICommentsSectionProps) => {
    // Render your comments section here
    if (!comments) return <h1>No Comments</h1>
    const [visibleComments, setVisibleComments] = useState<Comment[]>([])

    useEffect(() => {
      // Load the initial comments when the component mounts
      loadInitialComments()
    }, [])

    const loadInitialComments = () => {
      const initialComments = comments.slice(0, 10) // Load the first 10 comments
      setVisibleComments(initialComments)
    }

    const handleSeeMoreClick = () => {
      const currentlyVisibleCount = visibleComments.length
      const nextComments = comments.slice(
        currentlyVisibleCount,
        currentlyVisibleCount + 10
      )
      setVisibleComments([...visibleComments, ...nextComments])
    }

    return (
      <Card elevation={3} sx={{ marginTop: '2rem' }}>
        <CardContent>
          <Typography variant='h5'>Comments</Typography>
          {visibleComments.map((comment, index) => (
            <div key={index}>
              <Typography variant='body2' color='textSecondary' paragraph>
                {comment.comment_text}
              </Typography>
            </div>
          ))}
          {commentsRemainingCount
            ? commentsRemainingCount > 0
            : false && (
                <Button
                  variant='outlined'
                  onClick={handleSeeMoreClick}
                  color='primary'
                >
                  See More
                </Button>
              )}
        </CardContent>
      </Card>
    )
  }
)
