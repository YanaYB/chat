import { MongoClient, Db } from 'mongodb'
import { CONFIG } from '../config'

let db: Db | null = null

export async function connectMongo(): Promise<void> {
    if (db) {
        console.log('MongoDB already connected')
        return
    }

    try {
        const client = new MongoClient(CONFIG.DATABASE_URL)
        await client.connect()
        db = client.db(CONFIG.DB_NAME)
        console.log(`Connected to MongoDB database "${CONFIG.DB_NAME}"`)
    } catch (err) {
        console.error('Failed to connect to MongoDB', err)
        process.exit(1)
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error('MongoDB not connected')
    }
    return db
}
