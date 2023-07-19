import { compareSync, hashSync } from 'bcrypt'
import userRepository, { CreateUserParams } from '@/repositories/userRepository'
import errorResponse from '@/utils/httpResponse'
import app from '@/server'

export type SignInParams = Pick<CreateUserParams, 'email' | 'password'>

async function createUser(data: CreateUserParams) {
  const { email, username, password } = data

  await validateEmailAvailability(email)

  await validateUsernameAvailability(username)

  const hashedPassword = hashSync(password, 12)

  await userRepository.createUser({ ...data, password: hashedPassword })
}

async function signInUser(data: SignInParams) {
  const { email, password } = data

  const user = await validateEmailExistsOrFail(email)

  await validatePasswordMatchOrFail(password, user.password)

  const token = await generateToken(
    {
      id: user.id,
      username: user.name,
    },
    {
      sub: user.id,
      expiresIn: '14 days',
    },
  )

  return { token }
}

async function generateToken(saveData: any, options: any) {
  const token = app.jwt.sign(saveData, options)

  return token
}

async function validateEmailExistsOrFail(email: string) {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw errorResponse(401, 'Email ou senha incorreto')
  }

  return user
}

async function validatePasswordMatchOrFail(
  password: string,
  hashedPassword: string,
) {
  const match = compareSync(password, hashedPassword)

  if (!match) {
    throw errorResponse(401, 'Email ou senha incorreto')
  }
}

async function validateEmailAvailability(email: string) {
  const user = await userRepository.findByEmail(email)

  if (user) {
    throw errorResponse(409, 'Email já cadastrado')
  }
}

async function validateUsernameAvailability(username: string) {
  const user = await userRepository.findByUsername(username)

  if (user) {
    throw errorResponse(409, 'Usuário já cadastrado')
  }
}

export default {
  createUser,
  signInUser,
}
