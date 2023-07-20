import { api } from '@/lib/api'

export function uploadFile(data: any) {
  return api.post('/upload', data)
}
