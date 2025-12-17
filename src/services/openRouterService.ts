import OpenAI from 'openai'
import { MessageRole } from '../types/message'
import { Errors } from '../errors/errors'
import { CONFIG } from '../config'

const client = new OpenAI({
    apiKey: CONFIG.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
})

export type AIMessage = {
    role: MessageRole
    content: string
}

export async function getAIResponse(
    messages: AIMessage[]
): Promise<string> {

    const response = await client.chat.completions.create({
        model: CONFIG.OPENAI_MODEL!,
        messages,
    })

    const answer = response.choices[0]?.message?.content

    if (!answer) {
        throw Errors.EMPTY_AI_RESPONSE()
    }

    return answer
}
