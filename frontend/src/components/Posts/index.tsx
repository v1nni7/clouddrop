'use client'

import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useCallback, useContext, useEffect } from 'react'

import { getPostsRequest } from '@/services/post'
import { PostsContext } from '@/context/PostsContext'
import { ModalCreateContext } from '@/context/ModalCreateContext'

import PostCard from '../PostCard'
import Loading from '../Loading'
import useAsync from '@/hooks/useAsync'

export default function Posts() {
  const { data, loading } = useAsync(getPostsRequest)
  const { posts, setPosts } = useContext(PostsContext)

  const { toggleOpen } = useContext(ModalCreateContext)

  const loadingPosts = () => {
    try {
      if (data) {
        setPosts(data)
      }
    } catch (error: any) {
      toast.error(`${error.message}`)
    }
  }

  useEffect(() => {
    loadingPosts()
  }, [loadingPosts])

  return (
    <>
      <div className="relative w-full">
        {!loading ? (
          posts.length !== 0 ? (
            <div className="columns-2xs gap-4 space-y-4 pb-24">
              {posts.map((post, index) => {
                return <PostCard post={post} key={index} />
              })}
            </div>
          ) : (
            <div className="mx-auto space-y-4 py-4 text-center sm:max-w-md">
              <h2 className="text-xl sm:text-2xl">
                Você ainda não possui nenhuma postagem, crie uma agora mesmo!
              </h2>

              <button
                type="button"
                onClick={() => toggleOpen()}
                className="rounded-lg bg-indigo-500 p-2 text-white transition-colors hover:bg-indigo-600"
              >
                Criar postagem
              </button>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}
