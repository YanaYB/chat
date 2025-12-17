import { FastifyInstance } from 'fastify'
import { createChat, getChatsByUser } from '../services/chatService'
import { getUserId } from '../services/authService'

export default async function chatRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const userId = getUserId(request)
        const { systemPrompt } = request.body as { systemPrompt?: string }

        const chatId = await createChat(userId, systemPrompt)
        return { chatId }
    })

    app.get('/', async (request) => {
        const userId = getUserId(request)
        return getChatsByUser(userId)
    })
}
