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
