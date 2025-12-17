import { FastifyRequest } from 'fastify'
import { Errors } from '../errors/errors'

export function getUserId(request: FastifyRequest): string {
    const userId = request.headers['user-id']

    if (!userId || typeof userId !== 'string') {
        throw Errors.UNAUTHORIZED()
    }

    return userId
}
