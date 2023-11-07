import { useParams, useLocation } from 'react-router-dom'
import { Post } from '../Types/Responses/Post/GetAllPostsResponse'

export const UpdatePost = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const post: Post = state.post
  return (
    <>
      <h1>Update Post Component {id}</h1>
      <h1>Update Post Component {post.title}</h1>
      <h3>{JSON.stringify(post)}</h3>
    </>
  )
}
