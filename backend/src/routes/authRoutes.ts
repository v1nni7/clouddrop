import authController from '@/controllers/authController'
import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', authController.createUser)
}
