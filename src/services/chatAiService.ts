import { createMessage, getMessagesByChat } from './messageService'
import { getChatById } from './chatService'
import { getAIResponse } from './openRouterService'
import { MessageRole } from '../types/message'
import { CONFIG } from '../config'

export async function processUserMessage(
    chatId: string,
    userId: string,
    userMessage: string
): Promise<string> {
    const chat = await getChatById(chatId, userId)

    await createMessage(chatId, 'user', userMessage)

    const history = await getMessagesByChat(chatId)

    const recentMessages = history
        .slice(-CONFIG.MAX_CONTEXT_MESSAGES)
        .map((msg) => ({
            role: msg.role as MessageRole,
            content: msg.content,
        }))

    const llmMessages: { role: MessageRole; content: string }[] = []

    if (chat.systemPrompt) {
        llmMessages.push({
            role: 'system',
            content: chat.systemPrompt,
        })
    }

    llmMessages.push(...recentMessages)

    const aiResponse = await getAIResponse(llmMessages)

    await createMessage(chatId, 'assistant', aiResponse)

    return aiResponse
}
