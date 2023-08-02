import { FastifyInstance } from 'fastify'
import authController from '@/controllers/authController'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', authController.createUser)
  app.post('/login', authController.signIn)
}
