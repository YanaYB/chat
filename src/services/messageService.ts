import { Db } from 'mongodb'
import { getDb } from './mongoService'
import { Errors } from '../errors/errors'
import { MessageRole } from '../types/message'

export async function createMessage(
    chatId: string,
    role: MessageRole,
    content: string
): Promise<string> {
    if (!content.trim()) {
        throw Errors.MESSAGE_EMPTY()
    }

    const db: Db = getDb()

    const result = await db.collection('messages').insertOne({
        chatId,
        role,
        content,
        createdAt: new Date(),
    })

    return result.insertedId.toString()
}

export async function getMessagesByChat(chatId: string) {
    const db: Db = getDb()

    return db
        .collection('messages')
        .find({ chatId })
        .sort({ createdAt: 1 })
        .toArray()
}


