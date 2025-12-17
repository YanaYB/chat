export type MessageRole = 'system' | 'user' | 'assistant'

export type Message = {
    id: string
    chatId: string
    role: MessageRole
    content: string
    createdAt: Date
}
