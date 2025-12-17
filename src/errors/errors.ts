import { AppError } from './appError'

export const Errors = {
    UNAUTHORIZED: () =>
        new AppError(
            'UNAUTHORIZED',
            'Unauthorized',
            401
        ),

    CHAT_NOT_FOUND: () =>
        new AppError(
            'CHAT_NOT_FOUND',
            'Chat not found',
            404
        ),

    MESSAGE_EMPTY: () =>
        new AppError(
            'MESSAGE_EMPTY',
            'Message content is empty',
            400
        ),

    CHAT_ID_REQUIRED: () =>
        new AppError(
            'CHAT_ID_REQUIRED',
            'chatId is required',
            400
        ),
    OPENAI_API_KEY: () =>
        new AppError(
            'OPENAI_API_KEY',
            'OPENAI_API_KEY is not set',
            400
        ),
    EMPTY_AI_RESPONSE: () =>
        new AppError(
            'EMPTY_AI_RESPONSE',
            'Response is empty',
            400
        ),
    INVALID_CHAT_ID: () =>
        new AppError(
            'INVALID_CHAT_ID',
            'Chat ID is invalid',
            400
        )

}
