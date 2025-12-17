import { Db, ObjectId } from 'mongodb'
import { getDb } from './mongoService'
import { Errors } from '../errors/errors'

export async function createChat(
    userId: string,
    systemPrompt?: string
): Promise<string> {
  const db: Db = getDb()

  const result = await db.collection('chats').insertOne({
    userId,
    systemPrompt,
    createdAt: new Date(),
  })

  return result.insertedId.toString()
}

export async function getChatsByUser(userId: string) {
  const db: Db = getDb()

  return db
      .collection('chats')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray()
}

export function isValidObjectId(id: string) {
  return ObjectId.isValid(id)
}

export async function getChatById(chatId: string, userId: string) {
  if (!chatId) {
    throw Errors.CHAT_ID_REQUIRED()
  }

  if (!isValidObjectId(chatId)) {
    throw Errors.INVALID_CHAT_ID()
  }

  const db = getDb()
  const chat = await db.collection('chats').findOne({
    _id: new ObjectId(chatId),
    userId,
  })

  if (!chat) {
    throw Errors.CHAT_NOT_FOUND()
  }

  return chat
}
