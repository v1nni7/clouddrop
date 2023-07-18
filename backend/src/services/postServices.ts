import postRepository, { CreatePostParams } from '@/repositories/postRepository'
import errorResponse from '@/utils/httpResponse'
import { constants, promises } from 'node:fs'
import path from 'node:path'

async function createPost(data: CreatePostParams) {
  const { fileURL } = data

  await validateUploadExistsOrFail(fileURL)

  await postRepository.createPost(data)
}

async function getPostsByUserId(userId: string) {
  const posts = await postRepository.findByUserId(userId)

  return posts
}

async function getPostById(postId: string) {
  const post = await validatePostExistsOrFail(postId)
  return post
}

async function validatePostExistsOrFail(postId: string) {
  const post = await postRepository.findByPostId(postId)

  if (!post) {
    throw errorResponse(400, 'Post not found')
  }

  return post
}

async function validateUploadExistsOrFail(fileURL: string) {
  const filename = path.basename(fileURL)

  const uploadPath = path.join(__dirname, '../../uploads', filename)

  try {
    await promises.access(uploadPath, constants.F_OK)
  } catch (error) {
    throw errorResponse(400, 'Upload not found')
  }
}

export default {
  createPost,
  getPostsByUserId,
  getPostById,
}
