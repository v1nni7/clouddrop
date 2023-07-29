'use client'

import Image from 'next/image'
import { AxiosError } from 'axios'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { getPostsRequest } from '@/services/post'
import { PostsContext } from '@/context/PostsContext'
import { IoPlay } from 'react-icons/io5'
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
    <div className="relative w-full">
      {posts.length > 0 ? (
        <div className="columns-2xs gap-8 space-y-8">
          {posts.map((post, index: number) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border-2 border-zinc-400"
            >
              {post.type.includes('image') ? (
                <Link href={`/photo/${post.id}`}>
                  <Image
                    width={1024}
                    height={1024}
                    alt={post.title}
                    src={post.fileURL}
                    className="aspect-auto w-full"
                  />
                </Link>
              ) : (
                <Link href={`/video/${post.id}`}>
                  <video
                    key={index}
                    src={post.fileURL}
                    controls={false}
                    className="aspect-video w-full"
                  />

                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-zinc-950/40 text-white transition-colors group-hover:bg-zinc-800/20 group-hover:text-zinc-100/40">
                    <IoPlay className="text-7xl" />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-3 my-6 flex w-full flex-col justify-center">
          <h2 className="mb-4 text-xl font-semibold">
            Você ainda não possui nenhuma postagem 😥
          </h2>
        </div>
      )}
    </div>
  )
}
