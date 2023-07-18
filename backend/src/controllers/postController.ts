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

export default {
  createPost,
}
