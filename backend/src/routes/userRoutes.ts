import { FastifyInstance } from 'fastify'
import userController from '@/controllers/userController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', validateTokenMiddleware)

  app.get('/user/me', userController.getUser)
}
