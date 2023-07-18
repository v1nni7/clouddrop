import app from '@/server'
import { FastifyReply, FastifyRequest } from 'fastify'

export default async function validateTokenMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { authorization } = request.headers
  const token: string = authorization?.replace('Bearer ', '') || ''

  if (!token) {
    reply.code(401).send('Unauthorized')
  }
  try {
    const body: any = request.body
    const decoded: any = await app.jwt.verify(token)

    request.body = {
      ...body,
      userId: decoded.id,
    }
  } catch (error) {
    reply.code(401).send('Unauthorized')
  }
}
