import userRepository from '@/repositories/userRepository'
import errorResponse from '@/utils/httpResponse'

async function getUser(userId: string) {
  const user = await validateUserExistsOrFail(userId)

  return user
}

async function validateUserExistsOrFail(userId: string) {
  const user = await userRepository.findById(userId)

  if (!user) {
    throw errorResponse(404, 'Usuário não encontrado')
  }

  return user
}

export default {
  getUser,
}
