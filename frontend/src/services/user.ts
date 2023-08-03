import { api } from '@/lib/api'

export function getUserInfoRequest() {
  return api.get(`/user/me`)
}
