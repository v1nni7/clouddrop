'use client'

import Image from 'next/image'
import { AxiosError } from 'axios'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { getPostsRequest } from '@/services/post'
import { PostsContext } from '@/context/PostsContext'
import { IoEyeOutline, IoHeartOutline, IoPlay } from 'react-icons/io5'
import Link from 'next/link'

export default function Posts() {
  const { posts, setPosts } = useContext(PostsContext)

  const handleLoadingPosts = async () => {
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
  }

  useEffect(() => {
    handleLoadingPosts()
  }, [handleLoadingPosts])

  return (
    <>
      <div className="relative w-full">
        <div className="columns-2xs gap-4 space-y-4 py-16">
          {posts.map((post, index) => {
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-neutral-800 p-2"
              >
                {post.type.includes('video') ? (
                  <video
                    src={post.fileURL}
                    className="h-60 rounded-lg object-cover"
                  />
                ) : (
                  <Image
                    width={500}
                    height={500}
                    src={post.fileURL}
                    className="h-60 rounded-lg object-cover sm:h-full"
                    alt=""
                  />
                )}

                <div className="mb-2 mt-4 flex items-center justify-between">
                  <h3 className="">Vinicius</h3>

                  <div className="flex items-center gap-2 text-xl">
                    <IoEyeOutline />
                    <IoHeartOutline />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
