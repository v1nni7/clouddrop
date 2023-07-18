import { FastifyRequest, FastifyReply } from 'fastify'
import { ObjectSchema } from 'joi'

export default function validateSchemaMiddleware(schema: ObjectSchema) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await schema.validateAsync(request.body, {
        abortEarly: false,
      })
    } catch (error: any) {
      reply.code(400).send(error.details)
    }
  }
}
