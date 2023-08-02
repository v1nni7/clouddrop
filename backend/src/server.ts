import 'dotenv/config'

import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import staticFastify from '@fastify/static'
import { resolve } from 'node:path'

import { authRoutes } from './routes/authRoutes'
import { uploadRoutes } from './routes/uploadRoutes'
import postRoutes from './routes/postRoutes'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(multipart)

app.register(staticFastify, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

const secret: string = process.env.JWT_SECRET || ''

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret,
})

app.register(authRoutes)
app.register(userRoutes)
app.register(postRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })

export default app
