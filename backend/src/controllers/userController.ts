import userServices from '@/services/userServices'
import { FastifyRequest, FastifyReply } from 'fastify'

async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId } = request.params as { userId: string }

    const user = await userServices.getUser(userId)

    reply.code(200).send(user)
  } catch (error: any) {
    if (error.message) {
      reply.code(error.code).send(error.message)
    }

    reply.code(500).send('Internal server error')
  }
}

export default {
  getUser,
}
