import { FastifyReply, FastifyRequest } from 'fastify'
import authServices from '@/services/authServices'
import { CreateUserParams } from '@/repositories/userRepository'

async function createUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as CreateUserParams

    await authServices.createUser(body)

    reply.code(201)
  } catch (error: any) {
    if (error.message) {
      reply.code(error.code).send(error.message)
    }

    reply.code(500).send('Internal server error')
  }
}

export default {
  createUser,
}
