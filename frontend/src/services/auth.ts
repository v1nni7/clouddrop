import { api } from '@/lib/api'

type SignUpRequest = {
  name: string
  email: string
  password: string
  username: string
}

type SignInRequestData = Pick<SignUpRequest, 'email' | 'password'>

export function signInRequest(data: SignInRequestData) {
  return api.post('/login', data)
}

export function signUpRequest(data: SignUpRequest) {
  return api.post('/register', data)
}
