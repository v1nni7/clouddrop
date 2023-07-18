import { FastifyInstance } from 'fastify'
import postController from '@/controllers/postController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

export default async function postRoutes(app: FastifyInstance) {
  app.addHook('preHandler', validateTokenMiddleware)

  app.post('/post', postController.createPost)
  app.get('/post', postController.getPostsByUserId)
  app.get('/post/:postId', postController.getPostById)
}
