import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

export type Post = {
  id: string
  title: string
  fileURL: string
  type: string
}

type ProviderProps = {
  children: ReactNode
}

type ProviderValue = {
  posts: Post[] | null
  setPosts: Dispatch<SetStateAction<Post[] | null>>
}

export const PostsContext = createContext(null as unknown as ProviderValue)

export default function PostsProvider({ children }: ProviderProps) {
  const [posts, setPosts] = useState<Post[] | null>(null)

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  )
}
