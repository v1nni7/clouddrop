import { prisma } from '@/lib/prisma'
import { Post } from '@prisma/client'

export type CreatePostParams = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

function createPost(data: CreatePostParams) {
  return prisma.post.create({ data })
}

function findByUserId(userId: string) {
  return prisma.post.findMany({ where: { userId } })
}

function findByPostId(postId: string) {
  return prisma.post.findUnique({ where: { id: postId } })
}

export default {
  createPost,
  findByUserId,
  findByPostId,
}
