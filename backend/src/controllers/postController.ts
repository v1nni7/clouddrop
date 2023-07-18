import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePostParams } from '@/repositories/postRepository'
import postServices from '@/services/postServices'

async function createPost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as CreatePostParams

    await postServices.createPost(body)
  } catch (error: any) {
    if (error.message) {
      reply.code(error.code).send(error.message)
    }

    reply.code(500).send('Internal server error')
  }
}

async function getPostsByUserId(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId } = request.body as any

    const posts = await postServices.getPostsByUserId(userId)

    reply.code(200).send(posts)
  } catch (error: any) {
    if (error.message) {
      reply.code(error.code).send(error.message)
    }

    reply.code(500).send('Internal server error')
  }
}

export default {
  createPost,
  getPostsByUserId,
}
