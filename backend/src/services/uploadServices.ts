import { randomUUID } from 'node:crypto'
import errorResponse from '@/utils/httpResponse'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

const pump = promisify(pipeline)

async function uploadFile(upload: any) {
  if (!upload) {
    return errorResponse(400, 'No file uploaded')
  }

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

  if (!isValidFileFormat) {
    return errorResponse(400, 'Invalid file format')
  }

  const fileId = randomUUID()
  const extension = extname(upload.filename)

  const filename = fileId.concat(extension)

  const writeStream = createWriteStream(
    resolve(__dirname, '../../uploads', filename),
  )

  await pump(upload.file, writeStream)

  const fullUrl = 'http://localhost:3333'
  const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString()

  return fileUrl
}

export default {
  uploadFile,
}
