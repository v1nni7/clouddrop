import { hashSync } from 'bcrypt'
import userRepository, { CreateUserParams } from '@/repositories/userRepository'
import console from 'console'
import errorResponse from '@/utils/httpResponse'

async function createUser(data: CreateUserParams) {
  const { email, username, password } = data

  await validateEmailAlreadyExistsOrFail(email)

  await validateUsernameAlreadyExistsOrFail(username)

  const hashedPassword = hashSync(password, 12)

  await userRepository.createUser({ ...data, password: hashedPassword })
}

async function validateEmailAlreadyExistsOrFail(email: string) {
  const user = await userRepository.findByEmail(email)

  console.log(user)

  if (user) {
    throw errorResponse(409, 'Email already exists')
  }
}

async function validateUsernameAlreadyExistsOrFail(username: string) {
  const user = await userRepository.findByUsername(username)

  if (user) {
    throw errorResponse(409, 'Username already exists')
  }
}

export default {
  createUser,
}
