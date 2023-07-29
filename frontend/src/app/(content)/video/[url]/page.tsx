'use client'

import { useEffect, useState } from 'react'
import { getPostRequest } from '@/services/post'

type Video = {
  type: string
  title: string
  fileURL: string
}

export default function Video({ params }: { params: { url: string } }) {
  const [video, setVideo] = useState<Video | null>(null)

  const loadingVideo = async () => {
    try {
      const response = await getPostRequest(params.url)

      setVideo(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    loadingVideo()
  }, [])

  return (
    <main className="p-6">
      <div className="mx-auto max-w-5xl rounded-lg bg-zinc-200 p-4">
        <video controls src={video?.fileURL} className="rounded-lg shadow" />
        <h1 className="mt-4 rounded-lg bg-zinc-300 p-2 px-2 font-semibold">
          {video?.title} - Tipo: {video?.type}
        </h1>
      </div>
    </main>
  )
}
