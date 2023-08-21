import { prisma } from '@/lib/prisma'
import { Post } from '@prisma/client'

export type CreatePostParams = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

function createPost(data: CreatePostParams) {
  return prisma.post.create({ data })
}

function findAll(userId: string) {
  return prisma.post.findMany({
    where: {
      isPublic: true,
      userId: {
        not: userId,
      },
    },
  })
}

function findByUserId(userId: string) {
  return prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

function findByPostId(postId: string) {
  return prisma.post.findUnique({ where: { id: postId } })
}

export default {
  createPost,
  findAll,
  findByUserId,
  findByPostId,
}
