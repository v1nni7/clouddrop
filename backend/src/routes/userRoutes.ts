import { FastifyInstance } from 'fastify'
import userController from '@/controllers/userController'

export async function userRoutes(app: FastifyInstance) {
  app.get('/:userId', userController.getUser)
}
