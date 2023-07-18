import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export type CreateUserParams = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

function createUser(data: CreateUserParams) {
  return prisma.user.create({ data })
}

function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

function findByUsername(username: string) {
  return prisma.user.findUnique({ where: { username } })
}

export default {
  createUser,
  findByEmail,
  findByUsername,
}
