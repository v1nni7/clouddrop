'use client'

import Image from 'next/image'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'

import { getPublicPostsRequest } from '@/services/post'
import { Post } from '@/context/PostsContext'
import Loading from './Loading'

export default function ExplorePosts() {
  const [posts, setPosts] = useState<Post[] | null>(null)

  const handleLoadingPosts = useCallback(async () => {
    try {
      const response = await getPublicPostsRequest()

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
        {posts ? (
          posts.length !== 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {posts.map((post, index) => (
                <div className="h-full" key={index}>
                  {post.type.includes('image') ? (
                    <Image
                      width={500}
                      height={1000}
                      src={post.fileURL}
                      alt=""
                      className="h-36 rounded-lg border border-neutral-700 object-cover sm:h-96"
                    />
                  ) : (
                    <video
                      controls={false}
                      src={post.fileURL}
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-3 py-24">
              <h1 className="text-center text-2xl">
                Não há posts para exibir 😥
              </h1>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}
