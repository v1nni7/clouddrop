'use client'

import { AxiosError } from 'axios'
import { useCallback, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { getPostsRequest } from '@/services/post'
import { PostsContext } from '@/context/PostsContext'

import PostCard from './PostCard'

export default function Posts() {
  const { posts, setPosts } = useContext(PostsContext)

  const handleLoadingPosts = useCallback(async () => {
    try {
      const response = await getPostsRequest()

      if (response.status !== 200) {
        throw new Error(response.data)
      }

      setPosts(response.data)
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(`${error.response?.data}`)
      }

      toast.error(`${error.message}`)
    }
  }, [])

  useEffect(() => {
    handleLoadingPosts()
  }, [handleLoadingPosts])

  return (
    <>
      <div className="relative w-full">
        <div className="columns-2xs gap-4 space-y-4 pb-24">
          {posts.map((post, index) => {
            return <PostCard post={post} key={index} />
          })}
        </div>
      </div>
    </>
  )
}
