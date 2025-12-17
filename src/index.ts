import { CONFIG } from './config'
import { buildApp } from './app'

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

const start = async () => {
    const app = await buildApp()

    try {
        await app.listen({ port: CONFIG.PORT, host: 'localhost' })
        console.log(`Server listening at http://localhost:${PORT}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
