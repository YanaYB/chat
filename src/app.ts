import Fastify from 'fastify'
import chatRoutes from './routes/chats'
import messageRoutes from './routes/messages'
import { connectMongo } from './services/mongoService'
import { getUserId } from './services/authService'
import { AppError } from './errors/appError'

export async function buildApp() {
    const app = Fastify({ logger: true })

    await connectMongo()


    app.addHook('preHandler', async (request) => {
        getUserId(request)
    })

    app.setErrorHandler((error, request, reply) => {
        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({
                error: {
                    code: error.code,
                    message: error.message,
                },
            })
        }

        request.log.error(error)

        return reply.status(500).send({
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error',
            },
        })
    })

    app.register(chatRoutes, { prefix: '/chats' })
    app.register(messageRoutes, { prefix: '/messages' })

    return app
}
