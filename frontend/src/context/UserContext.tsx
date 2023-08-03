'use client'

import { getUserInfoRequest } from '@/services/user'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

type UserInfo = {
  name: string
  email: string
  username: string
  _count: {
    posts: number
  }
}

type ContextValue = {
  user: UserInfo
}

export const UserContext = createContext({} as ContextValue)

type UserProviderProps = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({} as UserInfo)

  const loadingUserInfo = useCallback(async () => {
    try {
      const response = await getUserInfoRequest()

      if (response.status !== 200) {
        throw new Error('Something went wrong')
      }

      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    loadingUserInfo()
  }, [loadingUserInfo])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
