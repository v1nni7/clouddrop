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
  posts: Post[]
  setPosts: Dispatch<SetStateAction<Post[]>>
}

export const PostsContext = createContext(null as unknown as ProviderValue)

export default function PostsProvider({ children }: ProviderProps) {
  const [posts, setPosts] = useState<Post[]>([])

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  )
}
