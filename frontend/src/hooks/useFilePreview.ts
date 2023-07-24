import { useEffect, useState } from 'react'

export default function useFilePreview(file: any) {
  const initialState = {
    url: '',
    type: '',
  }

  const [fileSource, setFileSource] = useState<any>(initialState)

  const resetPreview = () => {
    setFileSource(initialState)
  }

  useEffect(() => {
    if (file && file[0]) {
      const type = file[0].type
      const url = URL.createObjectURL(file[0])

      if (url !== fileSource.url) {
        setFileSource({ url, type })
      }
    }
  }, [file])

  return [fileSource, resetPreview]
}
