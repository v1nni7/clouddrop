'use client'

import { AxiosError } from 'axios'
import { useCallback, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { getPublicPostsRequest } from '@/services/post'
import { PostsContext } from '@/context/PostsContext'

import PostCard from './PostCard'

export default function ExplorePosts() {
  const { posts, setPosts } = useContext(PostsContext)

  const handleLoadingPosts = useCallback(async () => {
    try {
      const response = await getPublicPostsRequest()

      console.log(response)

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
        <div className="grid grid-cols-3">
          {posts.length !== 0 ? (
            posts.map((post, index) => {
              return <PostCard post={post} key={index} />
            })
          ) : (
            <div className="col-span-3 py-24">
              <h1 className="text-center text-2xl">
                Não há posts para exibir 😥
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
