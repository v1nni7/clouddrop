import Image from 'next/image'
import { IoEyeOutline, IoHeartOutline } from 'react-icons/io5'

import { Post } from '@/context/PostsContext'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-neutral-800 p-2">
      {post.type.includes('video') ? (
        <video src={post.fileURL} className="h-60 rounded-lg object-cover" />
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
}
