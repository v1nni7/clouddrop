import { FastifyInstance } from 'fastify'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'
import uploadController from '@/controllers/uploadController'

export async function uploadRoutes(app: FastifyInstance) {
  app.addHook('preHandler', validateTokenMiddleware)

  app.post('/upload', uploadController.uploadFile)
}
