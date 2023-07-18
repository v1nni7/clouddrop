import { prisma } from '@/lib/prisma'
import { Post } from '@prisma/client'

export type CreatePostParams = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

function createPost(data: CreatePostParams) {
  return prisma.post.create({ data })
}

export default {
  createPost,
}
