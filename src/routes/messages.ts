import { FastifyInstance } from 'fastify'
import { createMessage, getMessagesByChat } from '../services/messageService'
import { getChatById } from '../services/chatService'
import { getUserId } from '../services/authService'
import { Errors } from '../errors/errors'
import { processUserMessage } from '../services/chatAiService'

export default async function messageRoutes(app: FastifyInstance) {
    app.post('/', async (request) => {
        const userId = getUserId(request)
        const { chatId, content } = request.body as {
            chatId: string
            content: string
        }

        if (!chatId) {
            throw Errors.CHAT_ID_REQUIRED()
        }

        await getChatById(chatId, userId)

        const aiAnswer = await processUserMessage(chatId, userId, content)

        return {
            assistantMessage: aiAnswer,
        }
    })

    app.get('/', async (request) => {
        const userId = getUserId(request)
        const { chatId } = request.query as { chatId: string }

        if (!chatId) {
            throw Errors.CHAT_ID_REQUIRED()
        }

        await getChatById(chatId, userId)

        return getMessagesByChat(chatId)
    })
}