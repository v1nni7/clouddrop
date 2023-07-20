import { useEffect, useState } from 'react'

export default function useFilePreview(file: any) {
  const [fileSource, setFileSource] = useState<any>({ url: '', type: '' })

  useEffect(() => {
    if (file && file[0]) {
      const type = file[0].type
      const url = URL.createObjectURL(file[0])

      if (url !== fileSource.url) {
        console.log('passou')
        setFileSource({ url, type })
      }
    }
  }, [file])

  return [fileSource, setFileSource]
}
