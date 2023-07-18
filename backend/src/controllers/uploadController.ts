import { FastifyReply, FastifyRequest } from 'fastify'
import uploadServices from '@/services/uploadServices'

async function uploadFile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const upload = await request.file({
      limits: {
        fileSize: 1_048_576 * 300, // 300MB
      },
    })

    const fileURL = await uploadServices.uploadFile(upload)

    reply.code(201).send(fileURL)
  } catch (error: any) {
    console.log(error)
    if (error.message && error.code) {
      reply.code(error.code).send(error.message)
    }

    reply.code(500).send('Internal server error')
  }
}

export default {
  uploadFile,
}
