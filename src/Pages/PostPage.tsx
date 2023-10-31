import { useParams } from 'react-router-dom'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import {
  IPost,
  PostByIdResponse,
} from '../Types/Responses/Post/PostByIdResponse'
import { MainPost } from '../Components/MainPost'
import {
  CommentsSection,
  ICommentsSectionProps,
} from '../Components/CommentsSection'
export const Post = () => {
  const { id } = useParams()

  const axiosPrivate = useAxiosPrivate()

  const [response, setResponse] = useState<PostByIdResponse | null>(null)
  const [comments, setComments] = useState<ICommentsSectionProps>()
  const [post, setPost] = useState<IPost>({} as IPost)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const getPost = async () => {
      try {
        const { data: res } = await axiosPrivate.get<PostByIdResponse>(
          `/posts/${id}`,
          {
            signal: controller.signal,
          }
        )
        const { data } = res
        console.log(res)

        if (data) {
          const { comments, ...postWithoutComments } = data
          const { data: d, status, response, ...CommentsProps } = res
          setComments({ comments, ...CommentsProps })

          setPost(postWithoutComments)
        }
        if (isMounted) {
          setResponse(res)
        }
      } catch (error) {
        console.log(error)
        setPost({} as IPost)
      }
    }

    getPost()
    return () => {
      isMounted: false
      controller.abort()
    }
  }, [id])

  if (response?.data && comments) {
    return (
      <>
        <MainPost post={post} />
        <CommentsSection {...comments} />
      </>
    )
  }
}
