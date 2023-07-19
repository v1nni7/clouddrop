import { api } from '@/lib/api'

type SignInRequestData = {
  email: string
  password: string
}

export function signInRequest(data: SignInRequestData) {
  return api.post('/login', data)
}
