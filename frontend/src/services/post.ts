import { api } from '@/lib/api'

type PostRequest = {
  title: string
  fileURL: string
  type: string
}

export function createPostRequest(data: PostRequest) {
  return api.post('/post', data)
}

export function getPostsRequest() {
  return api.get('/post')
}

export function getPublicPostsRequest() {
  return api.get('/post/explore')
}

export function getPostRequest(postId: string) {
  return api.get(`/post/${postId}`)
}
