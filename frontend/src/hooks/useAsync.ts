import { useState, useEffect } from 'react'

export default function useAsync(handler: any, immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = async (...args: any) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await handler(...args)
      setData(data)
      return data
    } catch (error: any) {
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute,
  }
}
