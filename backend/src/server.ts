import 'dotenv/config'

import fastify from 'fastify'
import multipart from '@fastify/multipart'
import staticFastify from '@fastify/static'
import { resolve } from 'node:path'

import { authRoutes } from './routes/authRoutes'

const app = fastify()

app.register(multipart)

app.register(staticFastify, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
