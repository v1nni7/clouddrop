import userRepository from '@/repositories/userRepository'
import errorResponse from '@/utils/httpResponse'

async function getUser(id: string) {
  const user = await validateUserExistsOrFail(id)

  return user
}

async function validateUserExistsOrFail(id: string) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw errorResponse(404, 'Usuário não encontrado')
  }

  return user
}

export default {
  getUser,
}
